export default (state = [], action) => {
	switch (action.type) {
		case "SET_ARTICLES":
			return action.articles;
		case "ADD_ARTICLES":
			return [...state, ...action.articles];
		default:
			return state;
	}
};
