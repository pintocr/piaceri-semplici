export enum ActionType {
    INIT = "@@INIT",
    openSignupModal = "openSignupModal",
    closeSignupModal = "closeSignupModal",
    server_called = "server_called",
    add_products_from_server = "add_products_from_server",
    add_categories_from_server = "add_categories_from_server",
    update_limited_list = "update_limited_list",
    openLoginModal = "openLoginModal",
    closeLoginModal = "closeLoginModal",
    login = "login",
    logout = "logout",
    get_all_user_data = "get_all_user_data",
    get_address_data = "get_address_data",
    show_Address_Form = "show_Address_Form",
    close_Address_Form = "close_Address_Form",
    changeToLoginModal = "changeToLoginModal",
    changeToSignupModal = "changeToSignupModal",
    addToShoppingCart = "addToShoppingCart",
    openShoppingcart = "openShoppingcart",
    closeShoppingcart = "closeShoppingcart",
    changeSpecificAmount = "changeSpecificAmount",
    deleteLine = "deleteLine",
    show_edit_Address = "show_edit_Address",
    close_edit_Address = "close_edit_Address",
    show_edit_Account = "show_edit_Account",
    close_edit_Account = "close_edit_Account",
    add_searched_Products = "add_searched_Products",
    deleteShoppingCart = "deleteShoppingCart"
}
export interface IAction {
    type: ActionType;
}
