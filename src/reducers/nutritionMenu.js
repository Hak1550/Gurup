export default (state = {}, action) => {
	switch (action.type) {
		case 'SET_NUTRITION_MENU':
			return action.nutritionMenu;
		case 'CLEAR_NUTRITION_MENU':
			return state = {};
		default:
			return state
	}
}
