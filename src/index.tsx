import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './components/NavBar'
import * as serviceWorker from './serviceWorker';
import "antd/dist/antd.css";
import shoppingCart from './components/shoppingCart';
import { Icon } from 'antd';
import SignUpModal from './components/Signup';
import { CS } from './framework/CS';
import { IWindow } from './framework/IWindow';
import history from './framework/history';
import {  Router } from 'react-router-dom';

declare let window: IWindow;
window.CS = new CS();
//we create the inital Application State
window.CS.initializeStore();
 
ReactDOM.render( <Router history={history}><App stateCounter={window.CS.getUIState().counter} /></Router>, document.getElementById('root'));


  window.CS.getStore().subscribe(() => {
   console.log("rerender");
   //ReactDOM.render(<App stateCounter={window.CS.getUIState().counter} />, document.getElementById('root'));
   ReactDOM.render(<Router history={history}><App stateCounter={window.CS.getUIState().counter} /></Router>, document.getElementById('root'));

  });





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
