import React, { Component } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { unregisterPushToken } from "../../../actions/sign";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";
import i18n from '../../i18n';
import {config} from '../../styles/variables'
import setInitialStyles from '../../styles';

export default WrappedComponent => {
	class Logic extends Component {
		state = {
			currentLanguage: i18n.language.split('-')[0],
			purchaseHistory:null
		};

		changeLanguage = (lang = "en") => {
			// console.log("changeLanguage1 => ",lang);
			this.setState({ currentLanguage: lang });
			// console.log("changeLanguage2 => ",lang);
			i18n.changeLanguage(lang)
		};

		componentDidMount = async ()=>{
			let purchaseHistory = await AsyncStorage.getItem('purchaseHistory');
			this.setState({purchaseHistory})
		}
		logout = () => {
			const { pushToken, setDefaultTheme, dispatch, isCustomApp } = this.props;
			AsyncStorage.multiRemove(['subdomain', 'jwt_token'] ,async () => {
				dispatch({ type: "CLEAR_ME" });
				if (pushToken) {
					dispatch(unregisterPushToken(pushToken));
				}
				Actions.reset("entryOptions");
				if (!isCustomApp) {
					dispatch({ type: "CLEAR_INFLUENCER" });
					config.changeProperty([{ name: "appDomain", value: null }])
					setDefaultTheme();
				}
			});
		};
		render() {
			// console.log('me', this.props.me)
			return (
				<WrappedComponent
					logout={this.logout}
					state={this.state}
					changeLanguage={this.changeLanguage}
					{...this.props}
				/>
			);
		}
	}
	return compose(
		withNamespaces(["app_basic", "app_tariff","basic"], { wait: true }),
		connect(({ me, pushToken, influencer, isCustomApp }) => ({ me, pushToken, influencer, isCustomApp }))
	)(Logic);
};
