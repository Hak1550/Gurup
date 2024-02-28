export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_STATUS':
            return {
                ...state,
                ...{
                    ...action,
                    type: undefined,
                },
            }
        default:
            return state
    }
}
