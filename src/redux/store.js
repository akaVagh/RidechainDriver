import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import orderReducer from './reducers/orderReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
const rootReducer = combineReducers({ order: orderReducer });

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		  })
		: compose;

const enhancer = composeEnhancers(
	applyMiddleware(logger, thunk)
	// other store enhancers if any
);
const store = createStore(rootReducer, enhancer);
export default store;
