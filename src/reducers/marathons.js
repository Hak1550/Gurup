export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_MARATHONS':
            return [...action.marathons]
        default:
            return state
    }
}
