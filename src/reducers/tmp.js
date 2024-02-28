export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_MARATHON_DATE':
            return { ...state, marathonActiveDate: action.marathonActiveDate, init: action.init};
        default:
            return state
    }
}
