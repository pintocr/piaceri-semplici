import React from 'react';
import { Button, Input, message, Icon} from 'antd'
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

        // this.showModal = this.showModal.bind(this);
        // this.handleOk = this.handleOk.bind(this);
        // this.handleCancel = this.handleCancel.bind(this);
        // this.handleChange = this.handleChange.bind(this);

    };

    // user_name: {
    //     type: String
    // },
    // user_first_name: {
    //     type: String
    // },
    // user_last_name: {
    //     type: String
    // },
    // user_password: {
    //     type: String
    // },
    // user_email: {
    //     type: String
    // },
    // user_phone: {
    //     type: String
    // },

    render() {
        console.log("AccountSettings rendered()")
        return (
            <div>
                
            </div>
        )

    }
}