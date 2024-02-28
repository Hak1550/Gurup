export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_MARATHON':
            return {...action.marathon}
        default:
            return state
    }
}
