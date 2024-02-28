export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_NUTRITION_RECIPE':
            return action.nutritionRecipe;
        default:
            return state
    }
}
