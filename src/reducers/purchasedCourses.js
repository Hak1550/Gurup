export default (state = [], action) => {
	switch (action.type) {
		case 'SET_PURCHASED_COURSES':
			return [...action.purchasedCourses];
		case 'UPDATE_PURCHASED_COURSE':
			if(action.purchasedCourse){
				let new_state = state.slice();
				const courseToUpdate = state.findIndex(purchasedCourse => purchasedCourse._id === action.purchasedCourse._id);
				if(courseToUpdate !== -1){
					new_state.splice(courseToUpdate, 1);
				}
				return [...new_state, action.purchasedCourse];
			} else {
				return state
			}
		case 'ADD_PURCHASED_COURSE':
			return [...state, action.purchasedCourse];
		default:
			return state
	}
}
