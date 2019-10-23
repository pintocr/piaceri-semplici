import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import "antd/dist/antd.css";
import SignUpModal from './components/Signup';
import shoppingCart from './components/shoppingCart'

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
        <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
        <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
        <SignUpModal/>
      </div>
      <br />
      <Route exact path="/" component={App} />
      <Route exact path="/cart" component={shoppingCart} />
    </Router>
  )
  ReactDOM.render(routing, document.getElementById('root'));


  window.CS.getStore().subscribe(() => {
    ReactDOM.render(routing, document.getElementById('root'));
  });





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
