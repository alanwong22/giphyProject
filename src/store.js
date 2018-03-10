import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers'

export default function configStore() {
	/* eslint-disable no-underscore-dangle */
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(
		reducers,
		composeEnhancers(
			applyMiddleware(thunk)
		)
	);
	return store;
	/* eslint-enable */
}