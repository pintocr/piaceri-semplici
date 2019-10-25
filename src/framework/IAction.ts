export enum ActionType {
    INIT = "@@INIT",
    openSignupModal = "openSignupModal",
    closeSignupModal = "closeSignupModal",
    server_called = "server_called",
    add_products_from_server = "add_products_from_server",
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
