import React from "react";
import {View, TouchableOpacity,} from "react-native";
// import * as LinearGradient from 'expo-linear-gradient';
import {LinearGradient} from "expo-linear-gradient";
import {gradients} from "../../styles/variables";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {connect} from 'react-redux'
import { compose } from "redux"
import {changeMe} from "../../../actions/me";
import {email} from "../../../utils/validator";
import {withNamespaces} from "react-i18next";

export default (WrappedComponent) => {
    class Logic extends React.Component {
        state = {
            editedProfile: false,
            name: this.props.me.name,
            email: this.props.me.email,
            avatar: this.props.me.avatar,
            planName: (this.props && this.props.me && this.props.me.plan && this.props.me.plan.name)?
                this.props.me.plan.name:
                null,
            avatarLoading:false
        };

        toggleEditBtn = () => {
            this.setState({editedProfile: !this.state.editedProfile});
        };

        validate = (values) => {
            const {t, dispatch} = this.props;
            let errors = {};
            
            return errors;
        }
        toggleLoadingAvatar = ()=>{
			this.setState({
				avatarLoading:!this.state.avatarLoading
			})
		}

        saveUser = async () => {
            // console.log("save user");
			const { dispatch, t } = this.props
            const { name, avatar, email } = this.state
            let valid = true;

            if(!email || email.length<3 || email.indexOf(".") == -1 || email.indexOf("@") == -1){
                // console.log("EMAIL ERROR");
                dispatch({
					type: "ALERT",
					text: t("email_error")
                })
                valid = false;
            }
            if(!name || name.length < 3){
                errors.name = t("name_error");
                dispatch({
					type: "ALERT",
					text: t("name_error")
                })
                valid = false;
            }


			const editableFields = ["name", "email","avatar"]
			let editedFields = {}
			editableFields.forEach((field, key) => {
				if (this.props.me[field] !== this.state[field]) {
					editedFields[field] = this.state[field]
				}
            })
            // console.log("valid? ",editedFields)
			if (valid) {
                // console.log("valid")
				const me = await dispatch(changeMe({ user: editedFields }))
				this.setState({ editedProfile: !this.state.editedProfile })
			}
		}

        handleFieldName = (value) => {
            this.setState({name: value})
        };

        handleFieldEmail = (value) => {
            this.setState({email: value})
        };

        onUploadAvatar=(avatar) => {
            // console.log("onUploadAvatar ",avatar)
            this.setState({avatar})
        }

        onUploadProgress = (progress) => {
            //TODO: Сделать анимацию загрузки
            // console.log("UPLOAD SETTINGS", progress);
        }

        render() {
            return <WrappedComponent
                state={this.state}
                toggleLoadingAvatar={this.toggleLoadingAvatar}
                toggleEditBtn={this.toggleEditBtn}
                saveUser={this.saveUser}
                handleFieldName={this.handleFieldName}
                handleFieldEmail={this.handleFieldEmail}
                onUploadAvatar={this.onUploadAvatar}
                onUploadProgress={this.onUploadProgress}
                {...this.props}
            />
        }
    }
    // return connect(({me, influencer}) => ({me, influencer}))(Logic)
    return compose(
        withNamespaces(["app_basic"]),
        connect(({ me, influencer }) => ({ me, influencer }))
    )(Logic)
}