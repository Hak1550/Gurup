export default (state = {}, action) => {
    switch (action.type) {
        case 'START_ANIMATION':
            console.log("START_ANIMATION ",action)
            return {...state, ...action, };
        case 'STOP_ANIMATION':
            return {};
        default:
            return {...state}
    }
}