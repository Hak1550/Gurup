import React, { Component} from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from 'react-i18next';
import { withTheme } from "styled-components"
import multipleLoading from "hocs/multipleLoading"

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
		withNamespaces(["web_layout", "basic"]),
		withTheme,
		multipleLoading({
			branches: ["me"],
		}),
		connect(({ me, sidebar, influencer }) => ({ me, sidebar, influencer }))
	)(Logic);
};
