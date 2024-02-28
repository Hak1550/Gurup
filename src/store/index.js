import reducer from '../reducers';
import initialState from './initialState';
import configureStore from './configureStore';
export default configureStore(reducer, {...initialState});

