import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import cookie from 'react-cookie';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = cookie.load('token');
if (token) {
    store.dispatch({ type: AUTH_USER });
}

export default store;