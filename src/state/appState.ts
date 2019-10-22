export interface IUI{
    loggedIn: boolean;
    waitingForResponse:boolean;
    signupVisible : boolean;
}

interface IAssetData {
    _id: string;
    asset_name: string;
    asset_value: number;
  }

export interface IBM{
    assets:IAssetData[];
    shoppingCart?:IShoppingCart;
}

export interface IScItemData {
    product_id: string;
    count: number;
}

export interface IUserData {
    _id: String;
    user_name: String;
    user_first_name: String;
    user_last_name: String;
    user_password: String;
    user_email: String;
    user_phone: String;
}

export interface IShoppingCart {
    _id: string;
    items: IScItemData[];
    user?: IUserData;
}

export interface IState{
    UI:IUI;
    BM:IBM;
}

// initial state 
export const initial:IState = {
	UI: {
		loggedIn: false,
        waitingForResponse: false,
        signupVisible: false,       
	},
	BM: {
        assets:[]
	}
};
