import React from 'react';
import { Button, Input, message, Icon, Collapse } from 'antd'
import axios from 'axios';
import { IUserData } from '../state/appState'
import 'antd/dist/antd.css';
import Address from './Addresses'
import CreateAddress from './CreateAddress';
import App from '../App'
//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;
const { Panel } = Collapse;
interface IProps {
    stateCounter: number;
}

interface IState {
    UserData: IUserData;
}

export default class AccountSettings extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.createAddress = this.createAddress.bind(this);

    };



    render() {
        console.log("AccountSettings rendered()")
       
        if(window.CS.getUIState().addresses.length !== 0 && window.CS.getUIState().showCreateAddressForm === false) {
            const size = 'large'
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
                        <Button type="primary" size={size} onClick={this.createAddress}>
                            <Icon type="plus-square" />
                        </Button>
                        {window.CS.getUIState().addresses.map(address => <Address key={address._id} address={address} stateCounter={window.CS.getUIState().counter} />)}
                    </form>
                </div>
            )
        }
        else if (window.CS.getUIState().addresses.length === 0 && window.CS.getUIState().showCreateAddressForm === false) {
            const size = 'large'
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
                            <p>Noch keine Anschrift hinterlegt? Um eine Bestellung erfolgreich abschließen zu können benötigen sie eine Anschrift. </p>
                            <Button type="primary" size={size} onClick={this.createAddress}>
                                <Icon type="plus-square" />addresse hinzufügen
                            </Button>
                        </div>
                    </form>
                </div>
            )
        } else if (window.CS.getUIState().showCreateAddressForm === true) {
            return (
                <div>
                    <CreateAddress stateCounter={window.CS.getUIState().counter} />
                </div>
            )
        }
    
}
    handleChange(key: any) {
        console.log(key);
    }

    createAddress() {
        const action: IAction = {
            type: ActionType.show_Address_Form
        }
        window.CS.clientAction(action)
    }
    
}
