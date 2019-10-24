import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './components/NavBar'
import * as serviceWorker from './serviceWorker';
import "antd/dist/antd.css";


import { CS } from './framework/CS';
import { IWindow } from './framework/IWindow'
declare let window: IWindow;
window.CS = new CS();
//we create the inital Application State
window.CS.initializeStore();
 
ReactDOM.render(<App/>, document.getElementById('root'));


  window.CS.getStore().subscribe(() => {
    console.log("rerender");
    ReactDOM.render(<NavBar/>, document.getElementById('root'));
    ReactDOM.render(<App/>, document.getElementById('root'));
  });


serviceWorker.unregister();
