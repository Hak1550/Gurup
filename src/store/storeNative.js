import reducer from '../reducers';
import initialState from './initialState';
import configureStore from './configureStoreNative';

export default configureStore(reducer, {...initialState});

