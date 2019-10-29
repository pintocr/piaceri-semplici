import { initial, IState, IScItemData } from '../state/appState'
import { IWindow } from '../framework/IWindow'
import { IAction, ActionType } from '../framework/IAction'
import { IUserAction } from '../components/LogIn'
import { IAddressAction } from '../components/LoginContainer'
import { IProductsLoadedAction, IProductsLimitedAction, ICategoriesLoadedAction } from '../App'
import { IShoppingCartAction } from '../components/DetailPage'
import { ICountAction, IDeleteOneLine } from '../components/shoppingCart'


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
            const loggedInUser = action as IUserAction;
            newState.UI.loginVisible = false;
            newState.UI.loggedIn = true;
            newState.UI.user = loggedInUser.user;
            return newState;

        case ActionType.logout:
            newState.UI.loggedIn = false;
            return newState;

        case ActionType.get_all_user_data:
            const userDetails = action as IUserAction;
            newState.UI.user = userDetails.user;
            return newState;

        case ActionType.get_address_data:
            const addressData = action as IAddressAction;
            newState.UI.addresses = addressData.addresses;
            return newState;

        case ActionType.show_Address_Form:
            newState.UI.showCreateAddressForm = true;
            return newState;

        case ActionType.close_Address_Form:
            newState.UI.showCreateAddressForm = false;
            
        case ActionType.changeToLoginModal:
            newState.UI.signupVisible = false;
            newState.UI.loginVisible = true;
            return newState;

        case ActionType.changeToSignupModal:
            newState.UI.signupVisible = true;
            newState.UI.loginVisible = false;
            return newState;

        case ActionType.addToShoppingCart:
            const productData = action as IShoppingCartAction
            let alreadyInBasket = false;

            newState.BM.shoppingCart.items.forEach(element => {
                if (element.product_id === productData.productId) {
                    element.count = element.count + productData.amount
                    alreadyInBasket = true;
                }
            })

            if (!alreadyInBasket) {
                newState.BM.shoppingCart.items.push({
                    product_id: productData.productId,
                    count: productData.amount,
                    title: productData.title,
                    price: productData.price
                } as IScItemData);
            }
            return newState;

        case ActionType.openShoppingcart:
            newState.UI.shoppingVisible = true;
            return newState;

        case ActionType.closeShoppingcart:
            newState.UI.shoppingVisible = false;
            return newState;

        case ActionType.changeSpecificAmount:
            const amountChangeData = action as ICountAction
            newState.BM.shoppingCart.items[amountChangeData.indexOfItem].count = newState.BM.shoppingCart.items[amountChangeData.indexOfItem].count + amountChangeData.delta
            return newState;

        case ActionType.deleteLine:
            const lineToDelete = action as IDeleteOneLine;
            newState.BM.shoppingCart.items.splice(lineToDelete.indexOfLine, 1);
            return newState;

        default:
            window.CS.log("1. Error!!!!! no reducer defined");
            return newState;
    }
}

