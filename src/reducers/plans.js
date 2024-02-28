export default (state = [], action) => {
	switch (action.type) {
		case 'SET_PLANS':
			return [...action.plans];
		default:
			return state
	}
}
