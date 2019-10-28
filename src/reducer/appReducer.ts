import { initial, IState } from '../state/appState'
import { IWindow } from '../framework/IWindow'
import { IAction, ActionType } from '../framework/IAction'
import { IProductsLoadedAction, IProductsLimitedAction, ICategoriesLoadedAction } from '../App'

declare let window: IWindow;

export const reducer = (state = initial, action: IAction) => {
    window.CS.log("2. ACTION:" + action.type);
    let newState = JSON.parse(JSON.stringify(state)) as IState;
    newState.UI.counter = state.UI.counter + 1;
    switch (action.type) {
        case ActionType.INIT:
            return newState;

        case ActionType.openSignupModal:
            newState.UI.signupVisible = true;
            return newState;

        case ActionType.closeSignupModal:
            newState.UI.signupVisible = false;
            return newState;

        case ActionType.server_called:
            newState.UI.waitingForResponse = true;
            return newState;

        case ActionType.add_products_from_server:
            const productsLoaded = action as IProductsLoadedAction;
            newState.UI.waitingForResponse = false;
            newState.BM.products = productsLoaded.products;
            return newState;

        case ActionType.add_categories_from_server:
            const categoriesLoaded = action as ICategoriesLoadedAction;
            newState.UI.waitingForResponse = false;
            newState.BM.categories = categoriesLoaded.categories;
            return newState;

        case ActionType.update_limited_list:
            const limitedProducts = action as IProductsLimitedAction;
            newState.BM.productsLimited = limitedProducts.products;
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

