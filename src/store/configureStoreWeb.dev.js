import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import createSocketIoMiddleware from 'redux-socket.io';
import { composeWithDevTools } from 'redux-devtools-extension';
// import io from 'socket.io-client';

import webToast from '../middlewares/webToast';


export default function configureStore(reducer, state) {
    // let socket = io(process.env.SOCKET_URL);
    // let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

    const createDevStoreWithMiddleware = composeWithDevTools(
    // const createDevStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        applyMiddleware(webToast),
        // applyMiddleware(createLogger()),
    )(createStore);

    return createDevStoreWithMiddleware(reducer, state);;
}
