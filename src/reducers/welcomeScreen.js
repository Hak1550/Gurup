export default (state = {}, action) => {
	switch (action.type) {
		case 'SET_SCREEN':
			return {...state, screen: action.screen};
		default:
			return state;
	}
}
