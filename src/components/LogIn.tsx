import React from 'react';
import { Modal, Button, Input, Icon, message } from 'antd'
import axios from 'axios';

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

interface ICustomer {
  username: string;
  password: string;
}

interface IState {
  loginLoading: boolean;
  loginVisible: boolean;
  inputData: ICustomer;
}

export default class LoginModal extends React.PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      loginLoading: false,
      loginVisible: window.CS.getUIState().loginVisible,
      inputData: {
        username: "",
        password: ""
      },
    };
  };




  showModal = () => {
    const action: IAction = {
      type: ActionType.openLoginModal
    }
    window.CS.clientAction(action);
    this.setState({ loginVisible: window.CS.getUIState().loginVisible });
  };

  handleOk = (event: any) => {
    event.preventDefault();
    this.setState({ loginLoading: true });
    setTimeout(() => {
      this.setState({ loginLoading: false });
      const action: IAction = {
        type: ActionType.login
      }
      const input = this.state.inputData
      axios.post(`${process.env.REACT_APP_BACKEND}/user/login`, input)
        .then(res => {
          window.CS.clientAction(action);
          this.setState({ loginVisible: window.CS.getUIState().loginVisible });
        })
        .catch(error => {
          switch (error.response.data.error) {
            case "One input was empty":
              message.error("Bitte füllen Sie alle Felder aus");
              break;
            case "no such user found":
              message.error("Falscher Username oder Passwort");
              break;
            case "wrong password":
              message.error("Falscher Username oder Passwort");
              break;
            default:
              console.log("unbekannter Datenbankfehler");
              break;
          }
        });

      this.setState({ loginVisible: window.CS.getUIState().loginVisible });
    }, 300);
  };

  handleCancel = () => {
    const action: IAction = {
      type: ActionType.closeLoginModal
    }
    window.CS.clientAction(action);
    this.setState({ loginVisible: window.CS.getUIState().loginVisible });
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

  handleLink = () => {
    const action: IAction = {
      type: ActionType.changeToSignupModal
    }
    window.CS.clientAction(action);
    this.setState({ loginVisible: window.CS.getUIState().loginVisible });
  }

  render() {
    const { loginLoading } = this.state;
    const visible = window.CS.getUIState().loginVisible;
    return (
      <div>
        <Icon type="profile" style={iconStyle} theme="outlined" className="navigationEntry" onClick={this.showModal} />
        <Modal
          visible={visible}
          title="Anmelden"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Abbrechen
                </Button>,
            <Button style={{ "backgroundColor": "rgb(71, 38, 21)" }} form="loginForm" key="submit" type="primary" loading={loginLoading} onClick={this.handleOk}>
              Anmelden
                </Button>,
          ]}
        >
          <form id="loginForm">
            <p>Nutzername: </p>
            <Input placeholder="nutzername" name="username" value={this.state.inputData.username} onChange={this.handleChange} />&nbsp;
              <p>Passwort: </p>
            <Input.Password placeholder="password" name="password" value={this.state.inputData.password} onChange={this.handleChange} />&nbsp;
            </form>
          <p>Sie haben noch keinen Account bei uns?</p>
          <a onClick={this.handleLink}>Hier geht es zur Registrierung</a>
        </Modal>
      </div>
    );
  }

}
