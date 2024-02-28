export default (state = {}, action) => {
    switch (action.type) {
        case 'LIGHTBOX':
            return action.data
        default:
            return state
    }
}
