import React, {Component} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FitImage from 'react-native-fit-image';
import {connect} from 'react-redux'
import {reportMessage} from '../../../actions/chat';
import { compose } from "redux"
import { withNamespaces } from "react-i18next"
import { Alert, Platform} from 'react-native';

export default (WrappedComponent) => {
    class Logic extends Component {
        renderLightBoxImage = (uri) => (
            <FitImage
                source={{ uri }}
                indicator={true}
                indicatorColor="#fff" // react native colors or color codes like #919191
                indicatorSize="large" // (small | large) or integer
            />
        )


        actionsModal = async(message_id) =>{
            // console.log("actionsModal");
            const {t, dispatch} = this.props;

            let buttons = [{
                text: t("report"),
                onPress: () => {
                    dispatch(reportMessage(message_id))

                    dispatch({
                        type: "START_ANIMATION",
                        name: "checked",
                        text: t("message_reported"),
                        duration: 1500
                    })
                }
            }];
            let closeButton = {
                text: t("cancel"),
                style: 'cancel'
            };
            if (Platform.OS == 'ios') {
                buttons.push(closeButton);
            } else {
                buttons.unshift(closeButton);
            }

            // console.log("actionsModal2");
            await Alert.alert(
                t("actions_modal_text"),
                '', buttons, {
                    cancelable: true
                }
            )
        }

        render() {
            return <WrappedComponent actionsModal={this.actionsModal} renderLightBoxImage={this.renderLightBoxImage} {...this.props}/>
        }
    }

    // return connect(({ me }) => ({ me }))(Logic)

    return compose(
        withNamespaces("app_chats", { wait: true }),
        connect(({ me }) => ({ me }))
    )(Logic)
}
