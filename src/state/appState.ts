import mongoose, { Document } from 'mongoose';
import { string } from 'prop-types';

export interface IUI {
    counter: number;
    loggedIn: boolean;
    waitingForResponse: boolean;
    signupVisible: boolean;
    loginVisible: boolean;
    user: IUserData;
    addresses: IAddressData[];
    showCreateAddressForm: boolean;
}

export interface IBM {
    products: IProductData[];
    shoppingCart?: IShoppingCart;
}

export interface IProductData {
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
    pic_list: string[];
}

export interface IAddressData {
    _id: string;
    type: string;
    street: string;
    zip_code: string;
    city: string;
    iso_country_code: string;
    ref_user: string;
    pickup_station_id: string;
    pickup_ident_no: string;
    
}
interface ICategoryData {
    _id: string;
    name: string;
    description: string;
    pic_list: string[];
}

export interface IBM {
    categories: ICategoryData[];
    products: IProductData[];
    productsLimited: IProductData[];
    shoppingCart?: IShoppingCart;
}

export interface IScItemData {
    product_id: string;
    count: number;
}

export interface IUserData {
    _id: string;
    user_name: string;
    user_first_name: string;
    user_last_name: string;
    user_password: string;
    user_email: string;
    user_phone: string;
}

export interface IShoppingCart {
    _id: string;
    items: IScItemData[];
    user?: IUserData;
}

export interface IState {
    UI: IUI;
    BM: IBM;
}

// initial state 
export const initial: IState = {
    UI: {
        counter: 0,
        loggedIn: false,
        waitingForResponse: false,
        signupVisible: false,
        loginVisible: false,
        user: {
            _id: "",
            user_name: "",
            user_first_name: "",
            user_last_name: "",
            user_password: "",
            user_email: "",
            user_phone: ""
        },
        addresses: [],
        showCreateAddressForm: false,
    },
    BM: {
        categories: [],
        products: [],
        productsLimited: []
    }
};
