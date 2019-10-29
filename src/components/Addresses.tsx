import React from 'react';
import { Modal, Button, Input, message, Icon, Select, Descriptions, Collapse } from 'antd'
import axios from 'axios';
import { IUserData, IAddressData } from '../state/appState'
import 'antd/dist/antd.css';
import {getAddressActionCreator} from '../components/LoginContainer'

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
  UserData: IUserData;


}


export default class Address extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createAddress = this.createAddress.bind(this);
    this.deleteAddress = this.deleteAddress.bind(this);


  };


  render() {
    console.log("AccountSettings rendered()")

    const size = 'small'
    return (
      <div>
        <Button type="primary" size={size} onClick={this.deleteAddress} name={this.props.address._id}>
          <Icon type="minus-square" />delete
        </Button>
        <div className="DeliveryAddress">
          <Collapse defaultActiveKey={['1']} onChange={this.handleChange}>
            <Panel header={this.props.address.type} key={this.props.address._id}>
              <Descriptions title="Adresse">
                <Descriptions.Item label="Stadt">{this.props.address.city}</Descriptions.Item>
              </Descriptions>
              <Descriptions >
                <Descriptions.Item label="Land">{this.props.address.iso_country_code}</Descriptions.Item>
              </Descriptions>
              <Descriptions >
                <Descriptions.Item label="Straße">{this.props.address.street}</Descriptions.Item>
              </Descriptions>
              <Descriptions >
                <Descriptions.Item label="Postleitzahl">{this.props.address.zip_code}</Descriptions.Item>
              </Descriptions>
              <Descriptions >
                <Descriptions.Item label="Art der Adresse">{this.props.address.type}</Descriptions.Item>
              </Descriptions>
            </Panel>
          </Collapse>
        </div>

      </div>
    )
  }

  handleChange() {

  }

  createAddress() {
    const action: IAction = {
      type: ActionType.show_Address_Form
    }
    window.CS.clientAction(action)
  }
  deleteAddress(e:any){
    
    window.CS.clientAction(deleteAddressActionCreator(e))
  }


}

export function deleteAddressActionCreator(e:any){
  console.log("thats my e",e.target.name)
  return function (dispatch: any) {
    const uiAction: IAction = {
        type: ActionType.server_called
    }
    dispatch(uiAction);
   axios.get(`${process.env.REACT_APP_BACKEND}/address/deleteAddressData/${e.target.name}`).then(response => {
    console.log("address data", response.data);
    window.CS.clientAction(getAddressActionCreator()) ;
}).catch(function (error) { console.log(error); })
}
}


