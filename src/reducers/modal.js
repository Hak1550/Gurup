export default (state = {}, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return action.data;
        default:
            return state
    }
}
