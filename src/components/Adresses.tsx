import React from 'react';
import { Modal, Button, Input, message, Icon, Select, Descriptions } from 'antd'
import axios from 'axios';
import { IUserData } from '../state/appState'
import 'antd/dist/antd.css';

//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
const { Option } = Select;

declare let window: IWindow;

interface IProps {
  stateCounter: number
}

interface IState {
  UserData: IUserData;

}


export default class Address extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createAddress = this.createAddress.bind(this)


  };


  render() {
    console.log("AccountSettings rendered()")
    if (window.CS.getUIState().address._id !== "") {

      return (
        <div>
          <div className="DeliveryAddress">
            <Descriptions title="Adresse">
              <Descriptions.Item label="Stadt">{window.CS.getUIState().address.city}</Descriptions.Item>
              </Descriptions>
              <Descriptions >
              <Descriptions.Item label="Land">{window.CS.getUIState().address.iso_country_code}</Descriptions.Item>
              </Descriptions>
              <Descriptions >
              <Descriptions.Item label="Straße">{window.CS.getUIState().address.street}</Descriptions.Item>
              </Descriptions>
              <Descriptions >
              <Descriptions.Item label="Postleitzahl">{window.CS.getUIState().address.zip_code}</Descriptions.Item>
              </Descriptions>
              <Descriptions >
              <Descriptions.Item label="Art der Adresse">{window.CS.getUIState().address.type}</Descriptions.Item>
            </Descriptions>
          </div>
          <div className="BillingAddress">

          </div>
          <div className="PickUpStation">

          </div>
        </div>
      )

    }
    else {
      const size = 'large'
      return (

        <div>
          <p>Noch keine Anschrift hinterlegt? Um eine Bestellung erfolgreich abschließen zu können benötigen sie eine Anschrift. </p>
          <Button type="primary" size={size} onClick={this.createAddress}>
            <Icon type="plus-square" />
          </Button>
        </div>
      )
    }

  }

  handleChange() {

  }

  createAddress() {
    
  }



}