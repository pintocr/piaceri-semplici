import React from 'react';
import { Modal, Button, Input, message, Icon, Select, Descriptions, Collapse } from 'antd'
import axios from 'axios';
import { IUserData, IAddressData } from '../state/appState'
import 'antd/dist/antd.css';
import { getAddressActionCreator, IAddressAction } from '../components/LoginContainer'

//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
import CreateAddress from './CreateAddress';
const { Option } = Select;
const { Panel } = Collapse;
declare let window: IWindow;

interface IProps {
  stateCounter: number;
  address: IAddressData;
  
}

interface IState {
  inputData: IAddressData;
  active: string;

}


export default class Address extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    
  
    this.handleChange = this.handleChange.bind(this);
    this.createAddress = this.createAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);
    this.editAddress = this.editAddress.bind(this);
    this.saveAddress = this.saveAddress.bind(this);
    this.cHandleChange = this.cHandleChange.bind(this);
      this.state = {
      inputData: {
        _id: "",
        type: "",
        street: "",
        zip_code: "",
        city: "",
        iso_country_code: "",
        ref_user: "",
        pickup_station_id: "",
        pickup_ident_no: ""
      },
      active: ""
    }

  };


  render() {
    console.log("AccountSettings rendered()")

    const size = 'small'
    if (!window.CS.getUIState().edit_Address) {
      return (


        <div className="DeliveryAddress">
          <Collapse defaultActiveKey={[this.state.active]} onChange={this.cHandleChange}>
            <Panel header={this.props.address.type} key={this.props.address._id}>
              <div>
                <form id="AccountSettings" >
                  <div>
                    <table className="account-table">
                      <tr>
                        <th colSpan={2}>Adresse<br /><br /></th>
                      </tr>
                      <tr>
                        <td><p>Stadt:</p>&nbsp;</td>
                        <td><Input placeholder="Stadt" name="city" disabled value={this.props.address.city} />&nbsp;&nbsp;</td>
                      </tr>
                      <tr>
                        <td><p>Land:</p>&nbsp;</td>
                        <td><Input placeholder="Land" name="iso_country_code" disabled value={this.props.address.iso_country_code} />&nbsp;&nbsp;</td>
                      </tr>
                      <tr>
                        <td><p>Straße:</p>&nbsp;</td>
                        <td><Input placeholder="Straße" name="street" disabled value={this.props.address.street} />&nbsp;&nbsp;</td>
                      </tr>
                      <tr>
                        <td><p>Postleitzahl:</p>&nbsp;</td>
                        <td><Input placeholder="Postleitzahl" name="zip_code" disabled value={this.props.address.zip_code} />&nbsp;&nbsp;</td>
                      </tr>
                      <tr>
                        <td><p>Addressart:</p>&nbsp;</td>
                        <td><Input placeholder="Addressart" name="type" disabled value={this.props.address.type} />&nbsp;&nbsp;</td>
                      </tr>
                      <tr>
                        <td><p>AbholstationsId:</p>&nbsp;</td>
                        <td><Input placeholder="AbholstationsId" name="pickup_station_id" disabled value={this.props.address.pickup_station_id} />&nbsp;&nbsp;</td>
                      </tr>
                    </table>
                  </div>
                </form>
                <table>
                <tr>
                  <td>
                    <Button type="primary" size={size} onClick={this.editAddress} name={this.props.address._id}>
                      <Icon type="edit" />Adresse bearbeiten
                     </Button>&nbsp;&nbsp;
                 </td>
                  <td>
                    <Button type="primary" size={size} onClick={this.deleteAddress} name={this.props.address._id}>
                      <Icon type="minus-square" />Adresse entfernen
                     </Button>&nbsp;
                 </td>
                </tr>
              </table>
              </div>
            </Panel>
          </Collapse>
        </div>
      )
    } else {
      return (

        <div>
          <div className="DeliveryAddress">
            <Collapse defaultActiveKey={[this.state.active]} onChange={this.cHandleChange}>
              <Panel header={this.props.address.type} key={this.props.address._id}>
                <div>
                  <form id="AccountSettings" >
                    <div>
                      <table className="account-table">
                        <tr>
                          <th colSpan={2}>Adresse<br /><br /></th>
                        </tr>
                        <tr>
                          <td><p>Stadt:</p>&nbsp;</td>
                          <td><Input placeholder="Stadt" name="city" value={this.state.inputData.city} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                          <td><p>Land:</p>&nbsp;</td>
                          <td><Input placeholder="Land" name="iso_country_code" value={this.state.inputData.iso_country_code} onChange={this.handleChange}  />&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                          <td><p>Straße:</p>&nbsp;</td>
                          <td><Input placeholder="Straße" name="street" value={this.state.inputData.street} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                          <td><p>Postleitzahl:</p>&nbsp;</td>
                          <td><Input placeholder="Postleitzahl" name="zip_code" value={this.state.inputData.zip_code} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                          <td><p>Addressart:</p>&nbsp;</td>
                          <td><Input placeholder="Addressart" name="type" value={this.state.inputData.type} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                          <td><p>AbholstationsId:</p>&nbsp;</td>
                          <td><Input placeholder="AbholstationsId" name="pickup_station_id" value={this.state.inputData.pickup_station_id} onChange={this.handleChange} />&nbsp;&nbsp;</td>
                        </tr>
                      </table>
                    </div>
                  </form>
                  <Button type="primary" size={size} onClick={this.saveAddress} name={this.props.address._id}>
              <Icon type="save" />save
        </Button>
                </div>
              </Panel>
            </Collapse>
          </div>

        </div>
      )
    }
  }

  cHandleChange(key:any){
    console.log(key);
  }

  handleChange(event: any) {
    let { name, value } = event.target;
    this.setState({
      inputData: {
        ...this.state.inputData,
        [name]: value
      }
    });
  }

  editAddress(e:any) {
    this.setState({inputData:this.props.address})
    const action: IAction = {
      type: ActionType.show_edit_Address
    }
    window.CS.clientAction(action)
    this.setState ({active:e.target.name})

  }

  saveAddress() {
    const action: IAction = {
      type: ActionType.close_edit_Address
    }
    window.CS.clientAction(action)
    this.setState ({active:""})
    window.CS.clientAction(updateAddressActionCreator(this.state.inputData))
  }

  createAddress() {
    const action: IAction = {
      type: ActionType.show_Address_Form
    }
    window.CS.clientAction(action)
  }

  deleteAddress(e: any) {

    window.CS.clientAction(deleteAddressActionCreator(e))
  }


}

export function deleteAddressActionCreator(e: any) {
  console.log("thats my e", e.target.name)
  return function (dispatch: any) {
    const uiAction: IAction = {
      type: ActionType.server_called
    }
    dispatch(uiAction);
    axios.get(`${process.env.REACT_APP_BACKEND}/address/deleteAddressData/${e.target.name}`).then(response => {
      console.log("address data", response.data);
      window.CS.clientAction(getAddressActionCreator());
    }).catch(function (error) { console.log(error); })
  }
}



export function updateAddressActionCreator(input:IAddressData) {
  
  return function (dispatch: any) {
    const uiAction: IAction = {
      type: ActionType.server_called
    }
    dispatch(uiAction);

  const newAddressData = input;
  axios.post(`${process.env.REACT_APP_BACKEND}/address/editAddress/${newAddressData._id}`, newAddressData)
    .then(res => {
      console.log("update address route", res)
      console.log("user_ID", window.CS.getUIState().user._id)
      window.CS.clientAction(getAddressActionCreator());
    })
    .catch(error => {
      switch (error.response.data.error) {
        case "all fields must be filled":
          message.error("Bitte füllen Sie alle Felder aus");
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

