import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getNutritionMenu } from "actions/nutrition"
import { getTags } from 'actions/tags'
import multipleLoading from "hocs/multipleLoading"
import { withRouter } from 'react-router-dom'
import { withNamespaces } from "react-i18next"
import { withTheme } from 'styled-components'

export default WrapperComponent => {
	class Logic extends Component {
		state = {
			fullText: false
		}

		showText = () => {
			this.setState({fullText: true})
		}

		componentDidMount() {
			const { dispatch, match } = this.props;

			dispatch(getNutritionMenu(match.params.id))
		}

		render() {
			const { state, showText } = this;
			const props = { state, showText, ...this.props };

			return (
				<WrapperComponent
					{...props}
				/>
			)
		}
	}
	return compose(
		withTheme,
		withRouter,
		withNamespaces(["web_nutrition", "web_layout"]),
		multipleLoading({
			branches: ["nutritionMenu", "tags"],
		}),
		connect(({ nutritionMenu, tags }) => ({ nutritionMenu, tags }))
	)(Logic)
};
