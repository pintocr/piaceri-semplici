import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Coffee from '../src/components/coffee';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const routing = (
    <Router>
      <div className="navBar">
        <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
        <Link className ="navigationEntry" to="/coffee">Coffee</Link>&nbsp;
        <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
      </div>
      <br />
      <Route exact path="/" component={App} />
      <Route path="/coffee" component={Coffee} />
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'))


serviceWorker.unregister();
