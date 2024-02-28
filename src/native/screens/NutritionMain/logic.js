import React from 'react'
import {connect} from "react-redux";
import {getNutritionMenus, getNutritionRecipes} from "../../../actions/nutrition";
import { getTags } from '../../../actions/tags';
import {Actions} from "react-native-router-flux"
import isLoading from '../../../hocs/isLoading'
import {compose} from 'redux'
import {withNamespaces} from 'react-i18next'

export default (WrappedComponent) => {
    class Logic extends React.Component {
        state = {
            activeSection: 'menu'
        }

        componentDidMount() {
            const {dispatch} = this.props
            dispatch(getTags())

            dispatch(getNutritionMenus())
            dispatch(getNutritionRecipes())
        }

        _onPressCard = (type, id) => {
            // console.log("_onPressCard",type, id)

            switch (type) { 
                case 'menu':
                   return Actions.nutritionMenuSingle({id})
                case 'recipe':
                    return Actions.nutritionRecipeSingle({id})
            }
        }

        //Функция перехода между разделами. Меню или Рецепты
        _toggleSection = (section) => {
            this.setState({activeSection: section})
        }

        render() {
            return <WrappedComponent
                _toggleSection={this._toggleSection}
                state={this.state}
                _onPressCard={this._onPressCard}
                {...this.props} />
        }
    }

    return compose(
        withNamespaces('app_nutrition', {wait: true}),
        isLoading({
            status_path: ({status}) => ({status: status.nutritionMenus}),
        }),
        connect(({nutritionMenus, nutritionRecipes, tags}) => ({nutritionMenus, nutritionRecipes, tags}))
        )(Logic)
}