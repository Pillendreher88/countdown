import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CreateCountdown from './CreateCountdown';
//import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Main from './Main';
import Examples from './Examples';
import Stopwatch from './Stopwatch';

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/countdown">
      <Route path="/create">
        <CreateCountdown/>
      </Route>
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/examples/:example" exact>
        <Examples/>
      </Route>
      <Route path="/stopwatch" exact>
        <Stopwatch/>
      </Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
