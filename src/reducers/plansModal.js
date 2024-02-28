export default (state = {}, action) => {
    // console.log("pm reducer ",action);
    switch (action.type) {
        case 'PLANS_MODAL_CLOSE':
            return {...state, isOpen: false};
        case 'PLANS_MODAL_OPEN':
            return {...state, isOpen: true};
        case 'PLANS_MODAL_OPTIONS':
            return {...state, ...action.options}
        default:
            return state
    }
}