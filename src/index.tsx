import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const routing = (
    <Router>
      <div className="navBar">
        <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
        <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
        <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
      </div>
      <br />
      <Route exact path="/" component={App} />
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))


serviceWorker.unregister();
