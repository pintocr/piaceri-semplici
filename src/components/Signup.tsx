import React from 'react';
import { Modal, Button, Input, message, Icon }from 'antd'
import axios from 'axios';

//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;

interface INewCustomer {
    user_name: string;
    user_password: string;
    user_first_name: string;
    user_last_name: string;
    user_email : string;
    user_phone: string;
}

interface IProps {
  stateCounter: number
}

interface IState {
    signupLoading : boolean;
    signupVisible : boolean;
    inputData : INewCustomer;
}

export default class SignUpModal extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLink = this.handleLink.bind(this);

        this.state = {
            signupLoading: false,
            signupVisible : window.CS.getUIState().signupVisible,
            inputData : {
                user_name: "",
                user_password: "",
                user_first_name: "",
                user_last_name: "",
                user_email: "",
                user_phone: ""
            }
    };
}

  showModal = () => {
    const action: IAction = {
        type: ActionType.openSignupModal
      }
    window.CS.clientAction(action);
    this.setState({ signupVisible: window.CS.getUIState().signupVisible });
  };

  handleOk = (event : any) => {
    event.preventDefault();
    this.setState({ signupLoading: true });
    setTimeout(() => {
      this.setState({ signupLoading: false });
      const action: IAction = {
        type: ActionType.closeSignupModal
      }
      const input = this.state.inputData
      axios.post(`${process.env.REACT_APP_BACKEND}/user/signup`, input)
      .then(res => {
        window.CS.clientAction(action);
        this.setState({ signupVisible: window.CS.getUIState().signupVisible });
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
     
      this.setState({ signupVisible: window.CS.getUIState().signupVisible });
      }, 300);
  };

  handleCancel = () => {
    const action: IAction = {
        type: ActionType.closeSignupModal
      }
    window.CS.clientAction(action);
    this.setState({ signupVisible: window.CS.getUIState().signupVisible });
  };

  handleChange(event : any) {
      let { name, value } = event.target;
    this.setState({inputData : {
        ...this.state.inputData,
        [name]: value
        }
    });
  }

  handleLink = () => {
    const action: IAction = {
      type: ActionType.changeToLoginModal
    }
  window.CS.clientAction(action);
  this.setState({ signupVisible: window.CS.getUIState().signupVisible });
  }

  render() {
    const { signupLoading } = this.state;
    const visible =  window.CS.getUIState().signupVisible;
    return (
      <div>
        <Button style={{ "backgroundColor": "rgb(71, 38, 21)", "fontSize": "1.0rem", "borderColor": "white" }} type="primary" onClick={this.showModal}>
        <Icon type="user" style={{ fontSize: '24px' }} theme="outlined" />
        </Button>
        <Modal
          visible={visible}
          title="Neuer Kunde?"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Abbrechen
            </Button>,
            <Button  style={{ "backgroundColor": "rgb(71, 38, 21)" }} form = "signupForm" key="submit" type="primary" loading={signupLoading} onClick={this.handleOk}>
              Registrieren
            </Button>,
          ]}
        >  
        <form id="signupForm">
          <p>Nutzername: </p>
          <Input placeholder= "nutzername" name= "user_name" value = {this.state.inputData.user_name} onChange={this.handleChange} />&nbsp;
          <p>Passwort: </p>
          <Input.Password placeholder= "password" name = "user_password" value = {this.state.inputData.user_password} onChange={this.handleChange}/>&nbsp;
          <p>Vorname: </p>
          <Input placeholder= "vorname" name = "user_first_name" value = {this.state.inputData.user_first_name} onChange={this.handleChange}/>&nbsp;
          <p>Nachname: </p>
          <Input placeholder= "nachname" name ="user_last_name" value = {this.state.inputData.user_last_name} onChange={this.handleChange}/>&nbsp;
          <p>E-Mail Adresse: </p>
          <Input placeholder= "e-mail" name ="user_email" value = {this.state.inputData.user_email} onChange={this.handleChange}/>&nbsp;
          <p>Telefonnummer: </p>
          <Input placeholder= "telefon" name= "user_phone" value = {this.state.inputData.user_phone} onChange={this.handleChange}/>&nbsp;
        </form>
          <p>Sie haben bereits einen Account bei uns?</p>
          <a onClick={this.handleLink}>Hier geht es zur Anmeldung</a>
        </Modal>
      </div>
    );
  }
}