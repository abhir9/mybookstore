import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {hashHistory, IndexRoute, Route, Router} from 'react-router';
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './App';
import bookApp from './reducers';
import './index.css';
import {BookContainer,} from './containers';
import {DisplayMsg} from './components';

const routeMiddleware = routerMiddleware(hashHistory);
let store = createStore(bookApp, composeWithDevTools(
    applyMiddleware(thunkMiddleware, routeMiddleware)));
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={BookContainer}/>
          <Route path="*" component={DisplayMsg}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
);
