import * as serviceWorker from './serviceWorker';
import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import reducers from './reducers';
import Layout from './containers/layout';
import Items from './containers/items';
import Item from './containers/item';
import Check from './containers/check';
import AddItems from './containers/addItems';
import EditItems from './containers/editItem';
import Signin from './containers/auth';
import NavBar from './containers/navBar';
import Lending from './components/lending';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={NavBar}>
        <Route path="/" component={Lending} />
        <Route component={Layout}>
          <Route path="/adboard" component={Items} />
          <Route path="/categories/:id" component={Items} />
        </Route>
        <Route path="items/:id" component={Item} />
        <Route path="edititems/:id" component={EditItems} />
        <Route path="/check" component={Check} />
        <Route path="/addItems" component={AddItems} />
        <Route path="/signin" component={Signin} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
