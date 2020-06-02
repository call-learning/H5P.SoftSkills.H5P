import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { questionnaireCombinedReducers } from '../reducers/reducers';

let middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  questionnaireCombinedReducers, /* preloadedState, */
  composeEnhancers(applyMiddleware(...middleware))
);
