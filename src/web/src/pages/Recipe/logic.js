import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getNutritionRecipe } from "actions/nutrition"
import { withNamespaces } from "react-i18next"
import { withTheme } from "styled-components"
import multipleLoading from "hocs/multipleLoading"
import withHelmet from "hocs/withHelmet"

export default WrapperComponent => {
	class Logic extends Component {
		componentDidMount() {
			const { dispatch, match } = this.props;
			dispatch(getNutritionRecipe(match.params.id))
		}

		render() {
			return (
				<WrapperComponent
					{...this.props}
				/>
			)
		}
	}
	return compose(
		withTheme,
		withHelmet(({nutritionRecipe}) => ({title: nutritionRecipe.title})),
		multipleLoading({
			branches: ['nutritionRecipe']
		}),
		withNamespaces(["web_nutrition", "web_layout", "basic"]),
		connect(({ nutritionRecipe }) => ({ nutritionRecipe }))
	)(Logic)
};
