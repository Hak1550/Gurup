import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from 'react-i18next';

import withModal from 'hocs/withModal'

export default WrapperComponent => {
	class Logic extends Component {

		render() {
			return (
				<WrapperComponent
					{...this.props}
				/>
			);
		}
	}
	return compose(
		withModal("not_allowed"),
		withNamespaces("web_chats"),
		connect(null),
	)(Logic);
};
