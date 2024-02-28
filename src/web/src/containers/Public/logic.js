import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from 'react-i18next';
import { withTheme } from "styled-components"

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
		withNamespaces(["dashboard", "basic"]),
		withTheme,
		connect(({ me, sidebar }) => ({ me, sidebar }))
	)(Logic);
};
