import React from 'react';
import "antd/dist/antd.css";
import { Icon, Button } from 'antd';
import SignUpModal from '../components/Signup';
import LoginModal from '../components/LogIn';
import '../index.css';

//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;


interface IProps {
    stateCounter: number
  }


interface IState {
    isLoggedIn : boolean
}


export default class LoginContainerModal extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.logout = this.logout.bind(this)
        this.state = {
            isLoggedIn : window.CS.getUIState().loggedIn
        }
    };


    
render(){
    console.log("LoginContainer rendered()");
    if(window.CS.getUIState().loggedIn){
        return ( 
            <span>
                <Button style={{ "backgroundColor": "rgb(71, 38, 21)", "fontSize": "1.0rem", "borderColor": "white"}} type="primary" onClick={this.logout}>
                <Icon type="logout" style={{ fontSize: '24px' }} theme="outlined" />
                </Button>&nbsp;
            </span>
            );
        
    } else {
        return (
            <span className="logincontainer">
            <SignUpModal/>&nbsp;
            <LoginModal/>
            </span>
        );
    }
}



logout() {
    const action: IAction = {
        type: ActionType.logout
      }
    window.CS.clientAction(action);
    
    this.setState({
        isLoggedIn : window.CS.getUIState().loggedIn
    })
    
  };
}