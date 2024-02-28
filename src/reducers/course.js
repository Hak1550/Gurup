export default (state = {}, action) => {
	switch (action.type) {
		case 'SET_COURSE':
			return action.course;
		case 'CLEAR_COURSE':
			return state = {};
		default:
			return state
	}
}
