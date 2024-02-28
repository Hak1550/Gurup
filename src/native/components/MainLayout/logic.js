import React from "react";
import { connect } from "react-redux"
import { getMe } from "../../../actions/sign"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { compose } from "redux"
import { withNamespaces } from "react-i18next"

export default (WrappedComponent) => {
    class Logic extends React.Component {

        confirmEmail = async () => {
            const {dispatch, t} = this.props
            const jwt_token = await AsyncStorage.getItem("jwt_token")
            dispatch(getMe(jwt_token)).then(data => {
                if(data.me.status === 'not_validated') {
                    dispatch({ type: "ALERT", text: t('app_basic:email_still_not_validated') });
                }
            })
        }

        render() {
            return <WrappedComponent confirmEmail={this.confirmEmail} {...this.props}/>
        }
    }
    return compose(
        withNamespaces("app_basic", { wait: true }),
        connect(({ me, influencer }) => ({ me, influencer }))
    )(Logic)
}