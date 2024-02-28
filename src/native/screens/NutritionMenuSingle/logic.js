import React from "react";
import { connect } from "react-redux";
import { getNutritionMenu } from "../../../actions/nutrition";
import Preloader from "../../components/Preloader";
import { Actions } from "react-native-router-flux";
import { withNamespaces } from "react-i18next";
import { compose } from 'redux'

export default WrappedComponent => {
	class Logic extends React.Component {
		componentDidMount() {
			const { navigation, dispatch } = this.props;
			dispatch(getNutritionMenu(navigation.state.params.id));
		}

		_onPressCard = (type, id) => {
			Actions.nutritionRecipeSingle({ id });
		};

		render() {
			const { loading } = this.props;
			if (loading) {
				return <Preloader />;
			}
			return <WrappedComponent _onPressCard={this._onPressCard} {...this.props} />;
		}
	}

	return compose(
		withNamespaces("app_nutrition", { wait: true }),
		connect(({ nutritionMenu, loading }) => ({ nutritionMenu, loading }))
	)(Logic);
};
