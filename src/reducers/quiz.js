export default (state = {}, action) => {
	switch (action.type) {
		case 'ANSWER_QUESTION':
			return { index: state.index + 1, score: state.score + action.score};
		case 'REST_QUIZ':
			return { index: 0 , score: 0 }
		default:
			return state
	}
}
