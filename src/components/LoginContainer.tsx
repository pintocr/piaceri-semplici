import React from 'react';
import "antd/dist/antd.css";
import { Icon } from 'antd';
import SignUpModal from '../components/Signup';
import LoginModal from '../components/LogIn';
import '../index.css';
import { Link, Redirect, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import {IAddressData } from '../state/appState'
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
        this.getAddress = this.getAddress.bind(this)
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
                        <Link style={{ "backgroundColor": "rgb(71, 38, 21)", "fontSize": "1.0rem", "borderColor": "white" }} className="navigationEntry" to="/account" onClick={this.getAddress}>
                            <Icon type="setting" style={iconStyle} theme="outlined" />
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
                    <Redirect to="/" />
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

    getAddress() {
        window.CS.clientAction(getAddressActionCreator())
    }

}

export interface IAddressAction extends IAction {
    addresses: IAddressData[]
}

export function getAddressActionCreator() {
    console.log("##################################### --- getAddressActionCreator wird ausgeführt!")
    return function (dispatch: any) {
        const uiAction: IAction = {
            type: ActionType.server_called
        }
        dispatch(uiAction);
        axios.get(`${process.env.REACT_APP_BACKEND}/address/getAddressData/${window.CS.getUIState().user._id}`).then(response => {
            console.log("address data", response.data);
            const responseAction: IAddressAction = {
                type: ActionType.get_address_data,
                addresses: response.data.addressData as IAddressData[]
            }
            dispatch(responseAction);
        }).catch(function (error) { console.log(error); })
    }
}


