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
    get_all_user_data = "get_all_user_data",
    get_address_data = "get_address_data",
}
export interface IAction {
    type: ActionType;
}
