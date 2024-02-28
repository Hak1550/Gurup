import React, { Component } from "react";
import { connect } from "react-redux";
import {getPlans, cancelSubscription } from "../../../actions/plans";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";

export default WrappedComponent => {
	class Logic extends Component {

		async componentDidMount(){
			const { me, dispatch } = this.props;
			const plansResponse = await dispatch(getPlans());
			const { plans, gateway } = plansResponse;
			this.setState({ plans, gateway});
		}
		removeSubscription = async () => {
			if (this.state.gateway == "tks" || this.state.gateway == "kassa") {
				await this.props.dispatch(cancelSubscription());
				await this.props.dispatch({ type: "ALERT", text: this.props.t("app_tariff:subscription_cancelled") });
				Actions.pop();
			} else {
				if (Platform.OS === "ios") {
					Linking.openURL("itms-apps://apps.apple.com/account/subscriptions");
				} else if (Platform.OS === "android") {
					if (app.expo && app.expo.android)
						Linking.openURL(`https://play.google.com/store/account/subscriptions?package=${app.expo.android.package}`);
					else
						Linking.openURL('https://play.google.com/store/account/subscriptions');
				}
			}
		};

		render() {
			return <WrappedComponent
					removeSubscription={this.removeSubscription} 
					{...this.props} 
				/>;
		}
	}



	return compose(
		withNamespaces(["app_basic", "app_tariff"], { wait: true }),
		connect(({ me, influencer }) => ({ me, influencer }))
	)(Logic);
};
