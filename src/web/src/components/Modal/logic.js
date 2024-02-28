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

		close = () => {
			let {dispatch} = this.props
			dispatch({
				type: "TOGGLE_MODAL",
				data: {}
			})
		}

		render() {
			let {dispatch, toggleModal, modal, influencer} = this.props
			return (
				<WrapperComponent
					close={this.close}
					{...this.props}
				/>
			);
		}
	}
	return compose(
		connect(({modal})=>({modal})),
	)(Logic);
};
