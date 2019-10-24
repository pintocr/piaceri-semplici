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
}

interface IState {
}




export default class NavBar extends React.PureComponent<IProps, IState> {


    render () {
        return (
            <Router>
                <div className="navBar">
                <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
                <Link className ="navigationEntry" to="/coffee">Coffee</Link>&nbsp;
                <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
                <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
                <LoginContainerModal/>&nbsp;
                <Link className ="navigationEntry" to="/"><Icon type="shopping-cart" style={{ fontSize: '24px' }}/></Link>&nbsp;
                </div>
                <br />
                <Route path="/coffee" component={Coffee} />
            </Router>
        ) 
    }

}


