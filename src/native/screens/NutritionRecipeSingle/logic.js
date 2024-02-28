import React from "react";
import { connect } from "react-redux";
import { getNutritionRecipe } from "../../../actions/nutrition";
import Preloader from "../../components/Preloader/core";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";
export default WrappedComponent => {
	class Logic extends React.Component {
		componentDidMount() {
			const { navigation, dispatch } = this.props;
			dispatch(getNutritionRecipe(navigation.state.params.id));
		}

		render() {
			if (this.props.loading) return <Preloader />;

			return <WrappedComponent _toggleSection={this._toggleSection} state={this.state} {...this.props} />;
		}
	}

	return compose(
		withNamespaces("app_nutrition", { wait: true }),
		connect(({ nutritionRecipe, loading }) => ({ nutritionRecipe, loading }))
	)(Logic);
};
