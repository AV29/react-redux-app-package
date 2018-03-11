import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const isDev = process.env.NODE_ENV !== 'production';
const enhancers = middlewares => isDev ? composeEnhancers(applyMiddleware(...middlewares)) : applyMiddleware(...middlewares);

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    enhancers([thunk])
  );
}
