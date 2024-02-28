export default (state = [], action) => {
	switch (action.type) {
		case 'SET_EXERCISES':
			return [...action.exercises];
		case 'CLEAR_EXERCISES':
			return []
		case 'ALLOW_NEXT_EXERCISE':
			return state.map((exercise, index) => {
				let prevExercise = index > 0 ? state[index - 1] : null;
				if (prevExercise
					&& prevExercise._id === action.exercise
				) {
					return { ...exercise, allowed: true }
				} else {
					return exercise
				}
			})
		default:
			return state
	}
}
