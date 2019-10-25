export enum ActionType {
    INIT = "@@INIT",
    openSignupModal = "openSignupModal",
    closeSignupModal = "closeSignupModal",
    openLoginModal = "openLoginModal",
    closeLoginModal = "closeLoginModal",
    login = "login",
    logout = "logout",
    changeToLoginModal = "changeToLoginModal",
    changeToSignupModal = "changeToSignupModal",
}
export interface IAction {
    type: ActionType;
}
