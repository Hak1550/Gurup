import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTheme } from "styled-components";
import withForwardingRef from "hocs/withForwardingRef";
import {buyPlan, cancelSubscription, getPlans} from 'actions/plans';
import {changeMe} from "actions/me";
import {getStripeConfig} from "actions/misc";
import multipleLoading from "hocs/multipleLoading"
import { withNamespaces } from 'react-i18next';


export default WrapperComponent => {
	class Logic extends Component {
		state = {
			activePlan: null,
		};

		componentDidMount() {
			const { dispatch, setRef} = this.props;
			dispatch(getPlans())
			setRef(this)
		}

		buyPlan = async () => {
			const {dispatch, influencer} = this.props;
			const {activePlan} = this.state;
			const gateway = influencer.tld === "com" ? "stripe" : "tks";
			let payment = await dispatch(buyPlan({plan_id: activePlan, gateway, source: "web"}));

			if(gateway === "tks" && payment.url) {
				this.setState({checkoutUrl: payment.url});
				window.location = payment.url;
			} else if (gateway === "stripe" && payment.session) {
				const {public_key} = await dispatch(getStripeConfig());
				const stripe = Stripe(public_key, {
					stripeAccount: influencer.stripeUserId,
				});
				stripe.redirectToCheckout({
					sessionId: payment.session.id
				}).then(function (result) {
					console.log("RESULT OF CHECKOUT", result);
				});
			}
		};
		selectPlan = (plan_id) => this.setState({activePlan: plan_id});
		cancelSubscription = () => {
			const {dispatch} = this.props;
			dispatch(cancelSubscription())
		};
		render() {
			return (
				<WrapperComponent
					{...this.props}
					buyPlan={this.buyPlan}
					onPlanClick={this.selectPlan}
					unsubcribe={this.cancelSubscription}
					state={this.state}
				/>
			);
		}
	}
	return compose(
		withTheme,
		withForwardingRef,
		withNamespaces("web_layout"),
		multipleLoading({
			branches: ["plans"],
		}),
		connect(({plans, influencer})=>({plans, influencer}))
	)(Logic);
};
