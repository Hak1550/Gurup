export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_ME':
            return action.me;
        case 'EDIT_ME':
            console.log("EDIT_ME ", { ...state, ...action.me})
            return {...state, ...action.me};
        case 'CLEAR_ME':
            console.log("CLEAR_ME")
            return {}
        default:
            return state
    }
}
