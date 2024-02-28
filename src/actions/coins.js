import req, { request } from '../requester'


const withErrorDispatch = dispatch => (cb = err => err) => err => {
    console.log("withErrorDispatch err", err);
    dispatch({
        type: 'ERROR',
        code: err.code
    });
    cb(err);
};

export const setPlansModalOptions = (options) => dispatch => {
    dispatch({ type: 'PLANS_MODAL_OPTIONS', options })
}

export const togglePlansModal = (options) => dispatch => {

    options ? dispatch({ type: 'PLANS_MODAL_OPEN' }) : dispatch({ type: 'PLANS_MODAL_CLOSE' })
}

export const purchaseCoins = ({ ...rest }) => dispatch => new Promise((resolve, reject) => {
    request(req.post(`/coins/buy`, { ...rest }))
        .then(data => {
            return data
        })
        .catch(withErrorDispatch(dispatch)(reject))
        .then(data => resolve(data))
});
