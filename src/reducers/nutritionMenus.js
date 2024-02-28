export default (state = {}, action) => {
	switch (action.type) {
		case 'SET_NUTRITION_MENUS':
			return [...action.nutritionMenus]
		default:
			return state
	}
}
