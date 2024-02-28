import React from "react"
import ValidationComponent from "react-native-form-validator"
import { connect } from "react-redux"
import { registerPushToken, signUp, checkInfluencer } from "../../../../../actions/sign"
import { Actions } from "react-native-router-flux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import store from "../../../../../store/storeNative"
import { compose } from "redux"
import { withNamespaces } from "react-i18next"
import { initPushToken } from "../../../../utils/index"
import {config} from '../../../../styles/variables';
// import { Sentry } from 'react-native-sentry'
// import * as Sentry from "@sentry/react-native";

export default WrappedComponent => {
	class Logic extends ValidationComponent {
		constructor(props) {
			super(props)
			this.state = {
				email: "",
				password: "",
				confirmPassword: "",
				name: "",
			}
		}

		handleFieldChange = ({ name, value }) => {
			if(name == "email") {
				value = ("" + value).trim()
			}
			this.setState({ [name]: value })
		}

		_onPressButton = () => {
			const { dispatch, pushToken, influencer } = this.props
			this.validate({
				name: { minlength: 1, maxlength: 50, required: true },
				email: { email: true, required: true },
				password: { required: true },
			})

			const { email, password, name } = this.state
			const user = { email: email.trim().toLowerCase(), password, name }
			if(this.isFormValid()) {
				dispatch(signUp({ user }))
					.then(async ({user, jwt_token}) => {
						// getNotificationToken().then(token => {
						store.dispatch(registerPushToken(pushToken))
						// }).catch(status => console.log("USER PERMISSION IS: ", status));
						AsyncStorage.setItem("jwt_token", jwt_token)
						

						// Записать о регистрации пользователя в школе, в Local Storage

						const {appName, name, logo} = influencer
						const dataForStorage = {appName, name, logo}

						let schoolInStorage = await AsyncStorage.getItem('schools');
						// console.log('school in storage', schoolInStorage)

						if(schoolInStorage !== null) {
							schoolInStorage = JSON.parse(schoolInStorage)
							if(schoolInStorage.myschools) {
								const {myschools} = schoolInStorage;
								// console.log('schoolInStorage.myschools', schoolInStorage.myschools)
								const findSchool = myschools.find(school => school.name === influencer.name)
								if(!findSchool) {
									let newSchool = {...schoolInStorage}
									newSchool.myschools = [...newSchool.myschools, {...dataForStorage}]
									newSchool = JSON.stringify(newSchool)
									await AsyncStorage.setItem('schools', newSchool)
								}
							}
						} else {
							let schools = {myschools: [{...dataForStorage}]}
							schools = JSON.stringify(schools)
							await AsyncStorage.setItem('schools', schools)
						}

						// Записать о регистрации пользователя в школе, в Local Storage

						try {
							if(influencer && influencer.name) {
								initPushToken(influencer, dispatch)
							} else {
								console.log("no influencer")
							}
						} catch(e) {
							console.log("error => ", e)
						}

						try{
							let subdomain = null;
							if (!config || !config.appDomain) {
								// console.log("no appDOmain ")
								subdomain = await AsyncStorage.getItem('subdomain');
							}else{
								subdomain = config.appDomain;
							}
							if(subdomain){
								// console.log("subdomain in su ",subdomain);
								await dispatch(checkInfluencer({subdomain, config}))
							}
						}catch(e){
							console.log("e ",e);
						}

						// Sentry.setUser({
						// 	email: user.email,
						// 	id: user._id,
						// 	username: user.name
						// })
                		// Sentry.captureMessage("Hello SignUp!");  

						Actions.reset('tabbar')
						if (influencer.editableModules) {
							const mainModules = ["courses", "marathons", "nutrition", "articles"];
							const module = influencer.editableModules.find((module) => mainModules.includes(module));
							// console.log("First found module", module)
							if (module) {
								Actions.jump(`${module}_tab`);
							}
						}
						
						dispatch({
							type: "START_ANIMATION",
							name: "checked",
							duration: 1000,
						})
					})
					.catch(err => console.log("Err", err))
				return true
			} else {
				dispatch({
					type: "ALERT",
					text: this.getErrorMessages().split("\n")[0],
				})
				return false
			}
		}

		render() {
			return (
				<WrappedComponent
					handleFieldChange={ this.handleFieldChange }
					_onPressButton={ this._onPressButton }
					state={ this.state }
					{ ...this.props }
				/>
			)
		}
	}

	return compose(
		withNamespaces(["app_login"], { wait: true }),
		connect(({ pushToken }) => ({ pushToken })),
	)(Logic)
}
