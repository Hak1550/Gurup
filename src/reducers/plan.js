export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_PLAN':
            return action.data;
        default:
            return state
    }
}
