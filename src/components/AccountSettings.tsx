import React from 'react';
import { Button, Input, message, Icon, Collapse } from 'antd';
import { IUserData } from '../state/appState';
import 'antd/dist/antd.css';
import '../stylesheets/pages.scss';
import Address from './Addresses'
import CreateAddress from './CreateAddress';
import axios from 'axios';


//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow';
declare let window: IWindow;
const { Panel } = Collapse;
interface IProps {
    stateCounter: number;
}

interface IUserAction extends IAction {
    user: IUserData
}

interface IState {
    UserData: IUserData;
    edit: boolean;
}

export default class AccountSettings extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            UserData: {
                _id: "",
                user_name: "",
                user_first_name: "",
                user_last_name: "",
                user_password: "",
                user_email: "",
                user_phone: ""
            },
            edit: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.createAddress = this.createAddress.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);

    };



    render() {
        console.log("AccountSettings rendered()")
        if (window.CS.getUIState().addresses.length !== 0 && window.CS.getUIState().showCreateAddressForm === false && this.state.edit === true) {
            const size = 'large'
            return (
                <div>
                    <form id="AccountSettings" >
                        <div>
                            <table className="account-table">
                                <tr>
                                    <th colSpan={2}>Mein Account&nbsp;&nbsp;</th><th> <Icon type="save" onClick={this.handleSave} /> <br /><br /></th>
                                </tr>
                                <tr>
                                    <td><p>Nutzername:</p>&nbsp;</td>
                                    <td><Input placeholder="Nutzername" name="user_name" value={this.state.UserData.user_name} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Vorname:</p>&nbsp;</td>
                                    <td><Input placeholder="Vorname" name="user_first_name" value={this.state.UserData.user_first_name} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Nachname:</p>&nbsp;</td>
                                    <td><Input placeholder="Nachname" name="user_last_name" value={this.state.UserData.user_last_name} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Passwort: (Passwort muss neu gesetzt werden, andernfalls wird das Passwort zu 'asd' gesetzt!)</p>&nbsp;</td>
                                    <td><Input placeholder="password" type="password" name="user_password" value={this.state.UserData.user_password} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>E-Mail:</p>&nbsp;</td>
                                    <td><Input placeholder="email" name="user_email" value={this.state.UserData.user_email} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Telefon:</p>&nbsp;</td>
                                    <td><Input placeholder="phone" name="user_phone" value={this.state.UserData.user_phone} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                                </tr>
                            </table>
                        </div>

                        <div>
                            <table className="account-table">
                                <tr>
                                    <th>Meine Adressen<br /><br /></th>
                                </tr>

                                {window.CS.getUIState().addresses.map(address =>
                                    <tr><td><Address key={address._id} address={address} stateCounter={window.CS.getUIState().counter} /></td></tr>)}

                                <tr>
                                    <td>
                                        <Button type="primary" size={size} onClick={this.createAddress}>
                                            <Icon type="plus-square" />Addresse hinzufügen
                                    </Button>
                                    </td>
                                </tr>
                            </table>

                        </div>

                    </form>
                </div>
            )
        }else if (window.CS.getUIState().addresses.length === 0 && window.CS.getUIState().showCreateAddressForm === false && this.state.edit === true) {
            const size = 'large'
            return (
                <div>
                    <form id="AccountSettings" >
                        <div>
                            <table className="account-table">
                                <tr>
                                    <th colSpan={2}>Mein Account&nbsp;&nbsp;</th><th> <Icon type="save" onClick={this.handleSave} /> <br /><br /></th>
                                </tr>
                                <tr>
                                    <td><p>Nutzername:</p>&nbsp;</td>
                                    <td><Input placeholder="Nutzername" name="user_name" value={this.state.UserData.user_name} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Vorname:</p>&nbsp;</td>
                                    <td><Input placeholder="Vorname" name="user_first_name" value={this.state.UserData.user_first_name} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Nachname:</p>&nbsp;</td>
                                    <td><Input placeholder="Nachname" name="user_last_name" value={this.state.UserData.user_last_name} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Passwort: (Passwort muss neu gesetzt werden, andernfalls wird das Passwort zu 'asd' gesetzt!)</p>&nbsp;</td>
                                    <td><Input placeholder="password" type="password" name="user_password" value={this.state.UserData.user_password} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>E-Mail:</p>&nbsp;</td>
                                    <td><Input placeholder="email" name="user_email" value={this.state.UserData.user_email} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Telefon:</p>&nbsp;</td>
                                    <td><Input placeholder="phone" name="user_phone" value={this.state.UserData.user_phone} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                                </tr>
                            </table>
                        </div>

                        <div>
                            <table className="account-table">
                                <tr>
                                    <th>Meine Adressen<br /><br /></th>
                                </tr>

                                {window.CS.getUIState().addresses.map(address =>
                                    <tr><td><Address key={address._id} address={address} stateCounter={window.CS.getUIState().counter} /></td></tr>)}

                                <tr>
                                    <td>
                                        <Button type="primary" size={size} onClick={this.createAddress}>
                                            <Icon type="plus-square" />Addresse hinzufügen
                                    </Button>
                                    </td>
                                </tr>
                            </table>

                        </div>

                    </form>
                </div>
            )
        }
        else if (window.CS.getUIState().addresses.length !== 0 && window.CS.getUIState().showCreateAddressForm === false) {
            const size = 'large'
            return (
                <div>
                    <form id="AccountSettings" >
                        <div>
                            <table className="account-table">
                                <tr>
                                    <th colSpan={2}>Mein Account&nbsp;&nbsp;</th><th> <Icon type="edit" onClick={this.handleEdit} /> <br /><br /></th>

                                </tr>
                                <tr>
                                    <td><p>Nutzername:</p>&nbsp;</td>
                                    <td><Input placeholder="Nutzername" name="user_name" disabled value={window.CS.getUIState().user.user_name} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Vorname:</p>&nbsp;</td>
                                    <td><Input placeholder="Vorname" name="user_first_name" disabled value={window.CS.getUIState().user.user_first_name} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Nachname:</p>&nbsp;</td>
                                    <td><Input placeholder="Nachname" name="user_last_name" disabled value={window.CS.getUIState().user.user_last_name} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Passwort:</p>&nbsp;</td>
                                    <td><Input placeholder="password" type="password" name="user_password" disabled value={window.CS.getUIState().user.user_password} />&nbsp;&nbsp;</td>
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

                        <div>
                            <table className="account-table">
                                <tr>
                                    <th>Meine Adressen<br /><br /></th>
                                </tr>

                                {window.CS.getUIState().addresses.map(address =>
                                    <tr><td><Address key={address._id} address={address} stateCounter={window.CS.getUIState().counter} /></td></tr>)}

                                <tr>
                                    <td>
                                        <Button type="primary" size={size} onClick={this.createAddress}>
                                            <Icon type="plus-square" />Addresse hinzufügen
                                    </Button>
                                    </td>
                                </tr>
                            </table>

                        </div>

                    </form>
                </div>
            )
        }else if (window.CS.getUIState().addresses.length === 0 && window.CS.getUIState().showCreateAddressForm === false) {
            const size = 'large'
            return (
                <div>
                    <form id="AccountSettings" >
                        <div>
                            <table className="account-table">
                                <tr>
                                    <th colSpan={2}>Mein Account&nbsp;&nbsp;</th><th> <Icon type="edit" onClick={this.handleEdit} /> <br /><br /></th>

                                </tr>
                                <tr>
                                    <td><p>Nutzername:</p>&nbsp;</td>
                                    <td><Input placeholder="Nutzername" name="user_name" disabled value={window.CS.getUIState().user.user_name} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Vorname:</p>&nbsp;</td>
                                    <td><Input placeholder="Vorname" name="user_first_name" disabled value={window.CS.getUIState().user.user_first_name} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Nachname:</p>&nbsp;</td>
                                    <td><Input placeholder="Nachname" name="user_last_name" disabled value={window.CS.getUIState().user.user_last_name} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Passwort:</p>&nbsp;</td>
                                    <td><Input placeholder="password" type="password" name="user_password" disabled value={window.CS.getUIState().user.user_password} />&nbsp;&nbsp;</td>
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

                        <div>
                            <table className="account-table">
                                <tr>
                                    <th>Meine Adressen<br /><br /></th>
                                </tr>

                                {window.CS.getUIState().addresses.map(address =>
                                    <tr><td><Address key={address._id} address={address} stateCounter={window.CS.getUIState().counter} /></td></tr>)}

                                <tr>
                                    <td>
                                        <Button type="primary" size={size} onClick={this.createAddress}>
                                            <Icon type="plus-square" />Addresse hinzufügen
                                    </Button>
                                    </td>
                                </tr>
                            </table>

                        </div>

                    </form>
                </div>
            )
        }
        else if (window.CS.getUIState().addresses.length === 0 && window.CS.getUIState().showCreateAddressForm === false) {
            const size = 'large'
            return (
                <div>
                    <form id="AccountSettings" >
                        <div>
                            <table className="account-table">
                                <tr>
                                    <th colSpan={2}>Mein Account<br /><br />
                                    </th>
                                </tr>
                                <tr>
                                    <td><p>Nutzername:</p>&nbsp;</td>
                                    <td><Input placeholder="Nutzername" name="user_name" disabled value={window.CS.getUIState().user.user_name} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Vorname:</p>&nbsp;</td>
                                    <td><Input placeholder="Vorname" name="user_first_name" disabled value={window.CS.getUIState().user.user_first_name} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Nachname:</p>&nbsp;</td>
                                    <td><Input placeholder="Nachname" name="user_last_name" disabled value={window.CS.getUIState().user.user_last_name} />&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td><p>Passwort:</p>&nbsp;</td>
                                    <td><Input placeholder="password" type="password" name="user_password" disabled value={window.CS.getUIState().user.user_password} />&nbsp;&nbsp;</td>
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

                            <table className="account-table">
                                <tr>
                                    <th>Meine Adressen<br /><br /></th>
                                </tr>
                                <tr>
                                    <td>Noch keine Anschrift hinterlegt? Um eine Bestellung erfolgreich abschließen zu können benötigen sie eine Anschrift.
                                        <br /><br /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <Button type="primary" size={size} onClick={this.createAddress}>
                                            <Icon type="plus-square" />Addresse hinzufügen
                                    </Button>
                                    </td>
                                </tr>

                            </table>

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
    handleChange(event: any) {
        let { name, value } = event.target;
        this.setState({
            UserData: {
                ...this.state.UserData,
                [name]: value
            }
        });
    }

    createAddress() {
        const action: IAction = {
            type: ActionType.show_Address_Form
        }
        window.CS.clientAction(action)
    }

    handleEdit() {

        this.setState({
            UserData: {
                _id: window.CS.getUIState().user._id,
                user_name: window.CS.getUIState().user.user_name,
                user_first_name: window.CS.getUIState().user.user_first_name,
                user_last_name: window.CS.getUIState().user.user_last_name,
                user_password: "asd",
                user_email: window.CS.getUIState().user.user_email,
                user_phone: window.CS.getUIState().user.user_phone
            },
            edit: true
        });
        
        const action: IAction = {
            type: ActionType.show_edit_Account
        }
        window.CS.clientAction(action)
    }



    handleSave() {
        this.setState({ edit: false })
        window.CS.clientAction(updateUserDataActionCreator(this.state.UserData))
    }

}

function updateUserDataActionCreator(input:IUserData){
    return function (dispatch: any) {
        const uiAction: IAction = {
            type: ActionType.server_called
        }
        dispatch(uiAction);
        
        const newUserData = input;
        axios.post(`${process.env.REACT_APP_BACKEND}/user/editUser/${newUserData._id}`, newUserData)
          .then(res => {
            console.log("update user route", res)
            console.log("user_ID", window.CS.getUIState().user._id)
            const userUpdateAction: IUserAction = {
                type: ActionType.close_edit_Account,
                user: newUserData as IUserData
            }
            window.CS.clientAction(userUpdateAction)
          })
          .catch(error => {
            switch(error.response.data.error){
                case "all fields must be filled":
                        message.error("Bitte füllen Sie alle Felder aus");
                        break;
                case "user already exists":
                        message.error("Dieser Username ist bereits vergeben");
                        break;
                case "not a real email":
                        message.error("Bitte geben Sie ihre richtige Email Adresse an");
                        break;
                default:
                console.log("unbekannter Datenbankfehler");
                break;
            }
          });
        }
      };
      export function getUserData() {
        console.log("##################################### --- getAddressActionCreator wird ausgeführt!")
        return function (dispatch: any) {
            const uiAction: IAction = {
                type: ActionType.server_called
            }
            dispatch(uiAction);
            axios.get(`${process.env.REACT_APP_BACKEND}/user/getUserData/${window.CS.getUIState().user.user_name}`).then(response => {
                console.log("address data", response.data);
                const responseAction: IUserAction = {
                    type: ActionType.get_all_user_data,
                    user: response.data.user as IUserData
                }
                dispatch(responseAction);
            }).catch(function (error) { console.log(error); })
        }
    }