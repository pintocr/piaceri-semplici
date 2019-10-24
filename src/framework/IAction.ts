export enum ActionType {
    INIT = "@@INIT",
    openSignupModal = "openSignupModal",
    closeSignupModal = "closeSignupModal",
    openLoginModal = "openLoginModal",
    closeLoginModal = "closeLoginModal",
    login = "login",
    logout = "logout",
}
export interface IAction {
    type: ActionType;
}
