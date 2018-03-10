import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App/App';
import './index.css';

import configStore from './store';
// import registerServiceWorker from './registerServiceWorker';

// const initialState = {
// 	latestSearch: []
// }
const store = configStore();

ReactDOM.render((
	<Provider store={store}>
	  <BrowserRouter>
	    <App/>
	  </BrowserRouter>
	 </Provider>
), document.getElementById('root'));
// registerServiceWorker();
