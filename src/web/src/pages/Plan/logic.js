import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getPlan, buyPlan } from "actions/plans"
import multipleLoading from "hocs/multipleLoading"
import { withNamespaces } from "react-i18next"

export default WrapperComponent => {
	class Logic extends Component {

		state = {
			
		}

		componentDidMount() {
			const { match, dispatch } = this.props;
			const { plan_id } = match.params;
			if (plan_id) {
				dispatch(getPlan(plan_id));
			}
		}

		subscribe = async () => {
			const { dispatch, influencer, match } = this.props;
			const gateway = influencer.tld === "com" ? "stripe" : "tks";
			let payment = await dispatch(buyPlan({ plan_id: match.params.plan_id, gateway, source: "web" }));

			if (gateway === "tks" && payment.url) {
				// this.setState({ checkoutUrl: payment.url });
				window.location = payment.url;
			} else if (gateway === "stripe" && payment.session) {
				const { public_key } = await dispatch(getStripeConfig());
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

		render() {
			return (
				<WrapperComponent
					subscribe={this.subscribe}
					{...this.props}
				/>
			)
		}
	}
	return compose(
		withNamespaces(["basic", "app_courses", "web_basic", "web_layout", "pricing", "website_landing"]),
		multipleLoading({
			branches: ['plan']
		}),
		connect(({ plan, influencer }) => ({ plan, influencer }))
	)(Logic)
}
