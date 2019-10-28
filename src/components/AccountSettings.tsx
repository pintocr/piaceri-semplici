import React from 'react';
import { Button, Input, message, Icon } from 'antd'
import axios from 'axios';
import { IUserData } from '../state/appState'
import 'antd/dist/antd.css';
import Address from './Adresses'
//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;

interface IProps {
    stateCounter: number
}

interface IState {
    UserData: IUserData;
}

export default class AccountSettings extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);



    };



    render() {
        console.log("AccountSettings rendered()")
        return (
            <div>
                <p>Account Settings</p>&nbsp;
                <form id="AccountSettings" >
                    <div>
                    <table>
                        <tr>
                            <td><p>Nutzername:</p>&nbsp;</td>
                            <td><Input placeholder="Nutzername" name="user_name" disabled value={window.CS.getUIState().user.user_name} />&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                            <td><p>Passwort:</p>&nbsp;</td>
                            <td><Input placeholder="password" type="password" name="user_pass" disabled value={window.CS.getUIState().user.user_password} />&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                            <td><p>Vorname:</p>&nbsp;</td>
                            <td><Input placeholder="Vorname" name="user_firstname" disabled value={window.CS.getUIState().user.user_first_name} />&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                            <td><p>Nachname:</p>&nbsp;</td>
                            <td><Input placeholder="Nachname" name="user_lastname" disabled value={window.CS.getUIState().user.user_last_name} />&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                            <td><p>E-Mail:</p>&nbsp;</td>
                            <td><Input placeholder="email" name="user_email" disabled value={window.CS.getUIState().user.user_email} />&nbsp;&nbsp;</td>
                            </tr>
                        <tr>
                            <td><p>Telefon:</p>&nbsp;</td>
                            <td><Input placeholder="phone" name="user_phone" disabled value={window.CS.getUIState().user.user_phone} />&nbsp;&nbsp;</td>
                        </tr>
                        
                        
                    </table>
                    </div>
                    <Address stateCounter={window.CS.getUIState().counter} />
                </form>

            </div>
        )

    }
}