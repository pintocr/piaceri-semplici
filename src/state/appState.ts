import mongoose, { Document } from 'mongoose';

export interface IUI{
    counter: number;
    loggedIn: boolean;
    waitingForResponse:boolean;
    signupVisible : boolean;
}

interface IProductData extends Document {
    _id: string;
    product_id: string;
    title: string;
    description: string;
    price: number;
    amount: number;
    unit: string;
    manufacturer: string;
    ref_category: string;
    rating: number;
    pic_list: string;
  }

export interface IBM{
    products:IProductData[];
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
        counter: 0,
		loggedIn: false,
        waitingForResponse: false,
        signupVisible: false,       
	},
	BM: {
        products:[]
	}
};
