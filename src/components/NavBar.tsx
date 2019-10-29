import React from 'react';
import { Link } from 'react-router-dom';

import "antd/dist/antd.css";
import LoginContainerModal from './LoginContainer';
import ShoppingCartModal from './shoppingCart';
import '../index.css';
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

    render() {
        console.log("Navbar rendered()");
        return (
            <div>
                <div className="navBar">
                <div><Link className="navigationEntry" to="/">piaceri semplici.</Link>&nbsp;</div>
                <Link className ="navigationEntry" to="/coffee">Kaffee</Link>&nbsp;
                <Link className ="navigationEntry" to="/whiskey">Whiskey</Link>&nbsp;
                <Link className ="navigationEntry" to="/chocolate">Schokolade</Link>&nbsp;
                <LoginContainerModal stateCounter={window.CS.getUIState().counter} />&nbsp;
                <ShoppingCartModal stateCounter={window.CS.getUIState().counter}/>&nbsp;
                </div>
                <br />
            </div>
        ) 
    }

}


