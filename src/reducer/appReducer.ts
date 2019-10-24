import { initial, IState } from '../state/appState'
import { IWindow } from '../framework/IWindow'
import { IAction, ActionType } from '../framework/IAction'

declare let window: IWindow;

export const reducer = (state = initial, action: IAction) => {
    window.CS.log("2. ACTION:" + action.type);
    let newState: IState = state;
    newState = JSON.parse(JSON.stringify(state)) as IState;
    switch (action.type) {
        case ActionType.INIT:
            return newState;

        case ActionType.openSignupModal: 
            newState.UI.signupVisible = true;
            return newState;

        case ActionType.closeSignupModal: 
            newState.UI.signupVisible = false;
            return newState;

        case ActionType.openLoginModal: 
            newState.UI.loginVisible = true;
            return newState;

        case ActionType.closeLoginModal: 
            newState.UI.loginVisible = false;
            return newState;

        case ActionType.login: 
            newState.UI.loginVisible = false;
            newState.UI.loggedIn = true;
            return newState;

        case ActionType.logout: 
            newState.UI.loggedIn = false;
            return newState;

        default:
            window.CS.log("1. Error!!!!! no reducer defined");
            return newState;
    }
}

