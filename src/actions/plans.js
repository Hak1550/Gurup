import req, {request} from '../requester'


const withErrorDispatch = dispatch => (cb = err => err) => err => {
    console.log("withErrorDispatch err", err);
    dispatch({
        type: 'ERROR',
        code: err.code
    });
    cb(err);
};

export const setPlansModalOptions = (options) => dispatch => {
    dispatch({type: 'PLANS_MODAL_OPTIONS', options})
}

export const togglePlansModal = (options) => dispatch => {

    options ? dispatch({type: 'PLANS_MODAL_OPEN'}) : dispatch({type: 'PLANS_MODAL_CLOSE'})
}



export const getPaymentConfig = () => dispatch => new Promise((resolve, reject)=>{
    request(req.get('/config/payments'))
        .then(data => {
            return data
        })
        .catch(withErrorDispatch(dispatch)(reject))
        .then(data => resolve(data))
});
export const getPlans = () => dispatch => new Promise((resolve,reject) => {
    dispatch({
        type: 'SET_STATUS',
        plans: 'is_loading',
    });
    request(req.get('/plans'))
        .then(data => {
            if (data.coinBundles){
                dispatch({ type: "SET_COINS", coinsBundles: data.coinBundles });
            }
            dispatch({type: "SET_PLANS", plans: data.plans});
            dispatch({
                type: 'SET_STATUS',
                plans: 'is_ready',
            });
            return data
        })
        .catch(withErrorDispatch(dispatch)(reject))
        .then(data => resolve(data))
});

export const getPlan = (id) => dispatch => new Promise((resolve, reject) => {
    dispatch({
        type: 'SET_STATUS',
        plan: 'is_loading',
    });
    request(req.get('/plans/'+id))
        .then(data => {

            
            dispatch({ type: "SET_PLAN", data: data.plan });
            dispatch({
                type: 'SET_STATUS',
                plan: 'is_ready',
            });
            return data
        })
        .catch(withErrorDispatch(dispatch)(reject))
        .then(data => resolve(data))
});

export const buyPlan = ({plan_id, ...rest}) => dispatch => new Promise((resolve,reject) => {
    request(req.post(`/plans/${plan_id}/buy`,{...rest}))
        .then(data => {
            return data
        })
        .catch(data => {
            console.log("buyPlan error ",data);
            return data
        })
        // .catch(withErrorDispatch(dispatch)(reject))
        .then(data => resolve(data))
});

export const notifyRecipe = (receipt, gateway) => dispatch => new Promise((resolve, reject)=>{
    request(req.post(`/payment/notification/${gateway}`,{type:"appRecipeUpdate",receipt}))
    .then(data => {
        return data
    })
    .catch(data => {
        console.log("notififyRecipe error ",data);
        return data
    })
    // .catch(withErrorDispatch(dispatch)(reject))
    .then(data => resolve(data))
})


export const cancelSubscription = () => dispatch => new Promise((resolve,reject) => {
    request(req.post(`/plans/cancel`,{}))
        .then(data => {
            // me.plan
            dispatch({ type: "EDIT_ME", me: {plan:null} });
            return data
        })
        .catch(withErrorDispatch(dispatch)(reject))
        .then(data => resolve(data))
});

