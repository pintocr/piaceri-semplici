import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import "antd/dist/antd.css";
import { Icon } from 'antd';
import LoginContainerModal from './LoginContainer'
import '../index.css';
import Coffee from './coffee';
//redux
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;


interface IProps {
    stateCounter: number
  }

interface IState {
}
//  <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
//  <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
              
export default class NavBar extends React.PureComponent<IProps, IState> {

    render () {
        console.log("Navbar rendered()");
        return (
           <div>
                <div className="navBar">
                <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
                <Link className ="navigationEntry" to="/coffee">Coffee</Link>&nbsp;
                <LoginContainerModal stateCounter={window.CS.getUIState().counter}/>&nbsp;
                <Link className ="navigationEntry" to="/"><Icon type="shopping-cart" style={{ fontSize: '24px' }}/></Link>&nbsp;
                </div>
                <br />
              
                </div>
           
        ) 
    }

}


