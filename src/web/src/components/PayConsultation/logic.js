import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from 'react-i18next';

import withModal from 'hocs/withModal'

import {
	startPrivateChat,
	buyPrivateChat
} from 'actions/chat';

export default WrapperComponent => {
	class Logic extends Component {

		buy = async() => {
			const {dispatch, influencer} = this.props;
			const gateway = influencer.tld === "com" ? "stripe" : "tks";
			let payment = await dispatch(buyPrivateChat({gateway, source: "web"}));

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
		}

		render() {
			let {dispatch, toggleModal, modal, influencer} = this.props
			let {privateChatProductId} = influencer
			return (
				<WrapperComponent
					{...this.props}
					buy={this.buy}
				/>
			);
		}
	}
	return compose(
		withModal("chats_pay"),
		withNamespaces("web_chats"),
		connect(({modal, influencer})=>({modal, influencer})),
	)(Logic);
};
