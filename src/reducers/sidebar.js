export default (state = true, action) => {
	switch (action.type) {
		case 'TOGGLE_SIDEBAR':
			return action.data
		default:
			return state
	}
}
