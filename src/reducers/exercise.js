export default (state = {}, action) => {
	switch (action.type) {
		// case "SET_EXERCISE": 
		// 	return { ...state, ...action.exercise };
		case "SET_EXERCISE":
			return action.exercise
		case "CLEAR_EXERCISE":
			return (state = {});
		default:
			return state;
	}
};
