import React, { Component } from "react";
import { connect } from "react-redux";
import { getChats } from "../../../actions/chat";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";

export default WrappedComponent => {
	class Logic extends Component {
		afterPurchase = () => {
			const { dispatch } = this.props;
			dispatch(getChats());
		};
		render() {
			return <WrappedComponent afterPurchase={this.afterPurchase} {...this.props} />;
		}
	}

	return compose(
		withNamespaces(["app_basic", "app_tariff"], { wait: true }),
		connect(({ me, influencer }) => ({ me, influencer }))
	)(Logic);
};
