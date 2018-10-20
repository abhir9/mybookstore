import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
//import createLogger from 'redux-logger';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import bookApp from './reducers';
import './index.css';
import { BookContainer, BookDetail, StarDetail } from './containers';
import { DisplayMsg } from './components';

//const loggerMiddleware = createLogger();
const routeMiddleware = routerMiddleware(hashHistory);
let store = createStore(bookApp, composeWithDevTools(
  applyMiddleware(thunkMiddleware, routeMiddleware)));
const history = syncHistoryWithStore(hashHistory,store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <Route path="/" component={App}>
        <IndexRoute component={BookContainer} />
        {/*<Route path="/book/:id" component={BookDetail} />*/}
        {/*<Route path="/star/:id" component={StarDetail} />*/}
        {/*<Route path="/search/:keyword" component={BookContainer} />*/}
        <Route path="*" component={DisplayMsg} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
