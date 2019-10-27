import React from 'react';
import { Button, Input, message, Icon } from 'antd'
import axios from 'axios';
import { IUserData } from '../state/appState'
import 'antd/dist/antd.css';
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
                    <table>
                        <tr>
                            <td><p>Nutzername:</p>&nbsp;</td>
                            <td><Input placeholder="Nutzername" name="user_name" disabled value="User1" />&nbsp;&nbsp;</td>
                            <td><p>Passwort:</p>&nbsp;</td>
                            <td><Input placeholder="password" name="user_pass" disabled value="BumsePass" />&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                            <td><p>Vorname:</p>&nbsp;</td>
                            <td><Input placeholder="Vorname" name="user_firstname" disabled value="BumseVor" />&nbsp;&nbsp;</td>
                            <td><p>Nachname:</p>&nbsp;</td>
                            <td><Input placeholder="Nachname" name="user_lastname" disabled value="BumseNach" />&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                            <td><p>E-Mail:</p>&nbsp;</td>
                            <td><Input placeholder="email" name="user_email" disabled value="BumseMail" />&nbsp;&nbsp;</td>
                            <td><p>Telefon:</p>&nbsp;</td>
                            <td><Input placeholder="phone" name="user_phone" disabled value="BumsePhone" />&nbsp;&nbsp;</td>
                        </tr>
                        <tr className = "addresse junge">

                        </tr>
                    </table>
                </form>

            </div>
        )

    }
}