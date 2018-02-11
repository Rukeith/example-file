import 'babel-polyfill';
import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import routes from './routes';
import { loadAuthors } from './actions/authorActions';
import { loadCourses } from './actions/courseActions';
import './styles/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import configureStore from './store/configureStore';

const store = configureStore();
store.dispatch(loadAuthors());
store.dispatch(loadCourses());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);