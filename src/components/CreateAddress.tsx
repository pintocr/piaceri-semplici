import React from 'react';
import { Modal, Button, Input, message, Icon, Collapse, Select } from 'antd'
import axios from 'axios';
import { IAddressData } from '../state/appState'
import {getAddressActionCreator} from '../components/LoginContainer'
//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
import { format } from 'url';
declare let window: IWindow;
const { Option } = Select;
const { Panel } = Collapse;

interface INewAddress {
  _id: string;
  type: string;
  street: string;
  zip_code: string;
  city: string;
  iso_country_code: string;
  ref_user: string;
  pickup_station_id: string;
  pickup_ident_no: string;
}

interface IProps {
  stateCounter: number
}

interface IState {
  createAddressFormVisible: boolean;
  inputData: INewAddress;
}

export default class CreateAddress extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.showForm = this.showForm.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {

      createAddressFormVisible: window.CS.getUIState().showCreateAddressForm,
      inputData: {
        _id: "",
        type: "",
        street: "",
        zip_code: "",
        city: "",
        iso_country_code: "",
        ref_user: window.CS.getUIState().user._id,
        pickup_station_id: "",
        pickup_ident_no: "",


      }
    };
  }

  showForm = () => {
    const action: IAction = {
      type: ActionType.show_Address_Form
    }
    window.CS.clientAction(action);
    this.setState({ createAddressFormVisible: window.CS.getUIState().showCreateAddressForm });
  };

  handleOk = (event: any) => {
    event.preventDefault();
    const action: IAction = {
      type: ActionType.close_Address_Form
    }
    const input = this.state.inputData
    axios.post(`${process.env.REACT_APP_BACKEND}/address/createAddress`, input)
      .then(res => {
        console.log("create address route",res)
        console.log("user_ID", window.CS.getUIState().user._id)
        window.CS.clientAction(action);
        this.setState({ createAddressFormVisible: window.CS.getUIState().showCreateAddressForm });
        window.CS.clientAction(getAddressActionCreator()) ;
      })
      .catch(error => {
        switch (error.response.data.error) {
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

    this.setState({ createAddressFormVisible: window.CS.getUIState().showCreateAddressForm });

  };

  handleCancel = () => {
    const action: IAction = {
      type: ActionType.close_Address_Form
    }
    window.CS.clientAction(action);
    this.setState({ createAddressFormVisible: window.CS.getUIState().showCreateAddressForm });
    window.CS.clientAction(getAddressActionCreator()) ;
  };

  handleChange(event: any) {
    let { name, value } = event.target;
    this.setState({
      inputData: {
        ...this.state.inputData,
        [name]: value
      }
    });
  }


  // <Select defaultValue="Lieferadresse" style={{ width: 120 }} onChange={this.handleChange}>
  // <Option value="Lieferadresse" name="type">Lieferadresse</Option>
  //   <Option value="Rechnungsadresse" name="type">Rechnungsadresse</Option>
  //   <Option value="Abholstation" name="type">Abholstation</Option>
  // </Select>
//
  render() {
    if (window.CS.getUIState().showCreateAddressForm) {
      return (
        <div>
          <form id="createAddressForm">
            <p>Adresstyp: </p>
            <Input placeholder="Adresstyp" name="type" value={this.state.inputData.type} onChange={this.handleChange} />&nbsp;
          <p>Straße: </p>
            <Input placeholder="Straße" name="street" value={this.state.inputData.street} onChange={this.handleChange} />&nbsp;
          <p>Postleitzahl: </p>
            <Input placeholder="Postleitzahl" name="zip_code" value={this.state.inputData.zip_code} onChange={this.handleChange} />&nbsp;
          <p>Stadt: </p>
            <Input placeholder="Stadt" name="city" value={this.state.inputData.city} onChange={this.handleChange} />&nbsp;
          <p>Land: </p>
            <Input placeholder="Land" name="iso_country_code" value={this.state.inputData.iso_country_code} onChange={this.handleChange} />&nbsp;
          <p>Abholstation: </p>
            <Input placeholder="Abholstation" name="pickup_station_id" value={this.state.inputData.pickup_station_id} onChange={this.handleChange} />&nbsp;
          <p>AbholstationID: </p>
            <Input placeholder="AbholstationID" name="pickup_ident_no" value={this.state.inputData.pickup_ident_no} onChange={this.handleChange} />&nbsp;
        </form>
          <Button key="back" onClick={this.handleCancel}>
            Abbrechen
            </Button>,
            <Button style={{ "backgroundColor": "rgb(71, 38, 21)" }} form="signupForm" key="submit" type="primary" onClick={this.handleOk}>
            Adresse hinzufügen
            </Button>
        </div>
      );
    } else {
      return (
        <div>
          Nothin here!
    </div>
      );
    }
  }
}