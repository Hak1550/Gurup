import React, { Component } from "react"
import { compose } from "redux"
import { getNutritionMenu } from "actions/nutrition"
import { withNamespaces } from "react-i18next"
import { withTheme } from 'styled-components'

export default WrapperComponent => {
	class Logic extends Component {
		state = {
			visibleTags: false
		}

		showTags = () => {
			this.setState({visibleTags: true})
		}

		render() {
			const { recipes } = this.props;

			//Считаем общие калории меню, складывая калории всех рецептов
			let menuKcal = 0;

			if (recipes && recipes.length) {
				recipes.forEach(recipe => {
					if (recipe.nutritionValue && recipe.nutritionValue.kcal) {
						menuKcal += recipe.nutritionValue.kcal;
					}
				})
			}

			return (
				<WrapperComponent
					visibleTags={this.state.visibleTags}
					showTags={this.showTags}
					menuKcal={menuKcal}
					{...this.props}
				/>
			)
		}
	}

	return compose(
		withTheme,
		withNamespaces(["web_nutrition"]),
	)(Logic)
};
