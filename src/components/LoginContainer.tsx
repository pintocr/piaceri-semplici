import React from 'react';
import "antd/dist/antd.css";
import { Icon } from 'antd';
import SignUpModal from '../components/Signup';
import LoginModal from '../components/LogIn';
import '../index.css';
import { Redirect, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import history from '../framework/history'

//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;

const iconStyle = {
    fontSize: '24px', color: 'white', justifySelf: 'center', padding: '2px 15px'
}

interface IProps {
    stateCounter: number
}


interface IState {
    isLoggedIn: boolean
}


export default class LoginContainerModal extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.logout = this.logout.bind(this)
        this.state = {
            isLoggedIn: window.CS.getUIState().loggedIn
        }
    };



    render() {
        console.log("LoginContainer rendered()");
        if (window.CS.getUIState().loggedIn) {
            return (
                <span>
                    <span>
                        <Link className="navigationEntry" to="/account" >
                            <Icon type="edit" style={{ fontSize: '24px' }} theme="outlined" />
                        </Link>&nbsp;
            </span>
                    <span>
                        <Icon type="logout" style={iconStyle} className="navigationEntry" theme="outlined" onClick={this.logout} />
                    </span>
                </span>
            );

        } else {
            return (
                <span className="logincontainer">
                    <SignUpModal stateCounter={window.CS.getUIState().counter} />&nbsp;
            <LoginModal stateCounter={window.CS.getUIState().counter} />
                </span>
            );
        }

    }

    logout() {

        const action: IAction = {
            type: ActionType.logout
        }
        window.CS.clientAction(action);

        this.setState({
            isLoggedIn: window.CS.getUIState().loggedIn
        })

    };
}