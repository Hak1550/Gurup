export default (state = {}, action) => {
	switch (action.type) {
		case "SET_NUTRITION_RECIPES":
			return [...action.nutritionRecipes];
		default:
			return state;
	}
};
