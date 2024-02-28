import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getNutritionRecipes } from "actions/nutrition"
import { withNamespaces } from "react-i18next"
import multipleLoading from "hocs/multipleLoading"
import withHelmet from "hocs/withHelmet"

export default WrapperComponent => {
	class Logic extends Component {

		state = {
			loading: true
		}

		componentDidMount = async() => {
			let { dispatch } = this.props;
			this.setState({
				loading: true
			})
			let data = await dispatch(getNutritionRecipes({}));
			if (data) {
				this.maxKcal = data.maxKcal
				this.maxCookingTime = data.maxCookingTime
			}
			this.setState({
				loading: false
			})
		}

		getNutritionRecipes = (params) => this.props.dispatch(getNutritionRecipes(params));

		render() {
			let {t} = this.props
			let {loading} = this.state
			let filter
			if (!loading) {
				filter = {
					fetchData: this.getNutritionRecipes,
					ranges: [
						{field: "nutritionValue.kcal", title: t("calories"), max: this.maxKcal || 1000, label: t("kcal")},
						{field: "cookingTime", title: t("cooking_time"), max: this.maxCookingTime || 60, label: t("min")},
					]
				}
			}
			return (
				<WrapperComponent
					{...this.props}
					filter={filter}
				/>
			)
		}
	}
	return compose(
		withHelmet(() => ({title: 'web_layout:recipes_title'}), ['web_layout']),
		withNamespaces(["web_nutrition", "web_layout", "basic"]),
		multipleLoading({
			branches: ["nutritionRecipes", "tags"],
		}),
		connect(({ nutritionRecipes }) => ({ nutritionRecipes }))
	)(Logic)
};
