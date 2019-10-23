import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Coffee from '../src/components/coffee';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import "antd/dist/antd.css";
import SignUpModal from './component/Signup';

import { CS } from './framework/CS';
import { IWindow } from './framework/IWindow'
declare let window: IWindow;
window.CS = new CS();
//we create the inital Application State
window.CS.initializeStore();

const routing = (
    <Router>
      <div className="navBar">
        <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
        <Link className ="navigationEntry" to="/coffee">Coffee</Link>&nbsp;
        <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
        <SignUpModal/>
      </div>
      <br />
      <Route exact path="/" component={App} />
      <Route path="/coffee" component={Coffee} />
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'));


  window.CS.getStore().subscribe(() => {
    ReactDOM.render(routing, document.getElementById('root'));
  });


serviceWorker.unregister();
