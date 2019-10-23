export enum ActionType {
    INIT = "@@INIT",
    openSignupModal = "openSignupModal",
    closeSignupModal = "closeSignupModal",
    server_called = "server_called",
    add_products_from_server = "add_products_from_server"
}
export interface IAction {
    type: ActionType;
}
