import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import createSocketIoMiddleware from 'redux-socket.io';
// import io from 'socket.io-client';

import webToast from '../middlewares/webToast';

export default function configureStore(reducer, state) {
    // let socket = io(process.env.SOCKET_URL);
    // let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        // applyMiddleware(socketIoMiddleware),
        applyMiddleware(webToast),
    )(createStore);


    return createStoreWithMiddleware(reducer, state);
}
