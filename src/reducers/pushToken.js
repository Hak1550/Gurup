export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_PUSH_TOKEN':
            return action.pushToken;
        default:
            return state
    }
}