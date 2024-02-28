import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import nativeToast from '../middlewares/nativeToast';

export default function configureStore(reducer, state, params) {
    // const toast = configureToaster(params.toast);
    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk.withExtraArgument({})),
        applyMiddleware(nativeToast),
        // applyMiddleware(createLogger())
    )(createStore);


    return createStoreWithMiddleware(reducer, state);
}
