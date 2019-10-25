import React from 'react';
import '../App.css';
import { Input, Row } from 'antd';
import "antd/dist/antd.css";
import PagedArticles from './pagedArticles';
import { IAction, ActionType } from '../framework/IAction';
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

        return (
            <div>
                <div className="App">
                    <div className="Searchcontainer"></div>

                    <div className="product-container">
                        <p>Unsere erlesene Auswahl</p>
                        
                        <Row type="flex" justify="center">
                            {window.CS.getBMState().products.slice(9).map(product => <PagedArticles key={product._id} product={product} />)}
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

