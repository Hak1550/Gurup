export default (state = [], action) => {
    switch (action.type) {
        case 'SET_NOTIFICATIONS':
            return [...action.notifications];
        default:
            return state
    }
}
