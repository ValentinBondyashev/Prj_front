import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter,HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redusers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as d3 from "d3";
// import 'primereact/resources/primereact.min.css';
// import 'primereact/resources/themes/omega/theme.css';
// import 'font-awesome/css/font-awesome.css';
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render((
  
  <Provider store={store}>
      <App />
  </Provider>
  ), document.getElementById('root'));
registerServiceWorker();
