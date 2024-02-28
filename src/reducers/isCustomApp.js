export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_IS_CUSTOM':
            return action.isCustomApp;
        default:
            return state
    }
}