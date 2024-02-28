export default (state = null, action) => {
	switch (action.type) {
		case "SET_ONLINE":
			return {...action.influencerOnline}
		default:
			return state;
	}
};
