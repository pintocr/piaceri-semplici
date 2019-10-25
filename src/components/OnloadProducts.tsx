import React from 'react';
import '../App.css';
import "antd/dist/antd.css";
import StartPageArticles from './startPageArticles';
import { IAction } from '../framework/IAction';
import { IWindow } from '../framework/IWindow';

declare let window: IWindow;


interface IProps {

}

interface IState {

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
    pic_list: string;
}

export interface IProductAction extends IAction {
    product: IProductData
}

export default class OnloadProducts extends React.PureComponent<IProps, IState> {
    render() {
        //const productArr: IProductData[] = JSON.parse(JSON.stringify(window.CS.getBMState().products));

        return (
            <div>
                <div className="App">
                    <div className="Searchcontainer">
                        <p>Exclusive Selection</p>
                        {window.CS.getBMState().products.slice(9).map(product => <StartPageArticles key={product._id} product={product} />)}
                    </div>
                </div>
            </div>
        );
    }
}
// {window.CS.getBMState().products.map(product => <StartPageArticles key={product._id} product={product} />)}

