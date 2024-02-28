import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getNutritionMenus } from "actions/nutrition"
import {getTags} from 'actions/tags';
import multipleLoading from "hocs/multipleLoading"
import { withNamespaces } from "react-i18next"

export default WrapperComponent => {
	class Logic extends Component {

		componentDidMount() {
			const { dispatch } = this.props;
			dispatch(getNutritionMenus());
			dispatch(getTags());
		}
		getNutritionMenus = (params) => this.props.dispatch(getNutritionMenus(params));
		render() {
			let {tags} = this.props
			return (
				<WrapperComponent
					{...this.props}
					filter={{
						fetchData: this.getNutritionMenus,
						tags,
						// ranges: [
						// 	{field: "nutritionValue.kcal", title: "Калории", max: 2500, label: "Ккал"},
						// 	{field: "cookingTime", title: "Время готовки", max: 60, label: "мин"},
						// ]
					}}
				/>
			);
		}
	}
	return compose(
		withNamespaces(["web_nutrition", "web_layout"]),
		multipleLoading({
			branches: ["nutritionMenus", "tags"]
		}),
		connect(({nutritionMenus, tags})=>({nutritionMenus, tags}))
	)(Logic);
};
