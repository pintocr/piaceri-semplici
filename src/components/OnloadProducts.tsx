import React from 'react';
import '../App.css';
import { Row, Select, Input } from 'antd';
import "antd/dist/antd.css";
import PagedArticles from './pagedArticles';
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow';
import { IProductData, IProductsLimitedAction, searchAnything } from '../App';

declare let window: IWindow;
const { Option } = Select;
const { Search } = Input;



interface IProps {
    limitedList: IProductData[];
}

interface IState {
    products: IProductData[]
}

export interface IProductAction extends IAction {
    product: IProductData
}

export default class OnloadProducts extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.handleSort = this.handleSort.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

    }

    render() {
        console.log("onloadPage")
        return (
            <div>
                <div className="App">
                    <div className="Searchcontainer"></div>

                    <div className="product-container">
                        <p className="selection">Unsere erlesene Auswahl</p>
                        <Row type="flex" justify="center">

                            <div className="Searchbox">
                                <Search placeholder="Artikelsuche: Name hier eingeben" className="searchItemStyle" onSearch={this.handleSearch} enterButton size="small" />
                            </div>


                            <Select defaultValue="title" size="small" className="searchItemStyle" onChange={this.handleSort}>
                                <Option value="title">Sortiere nach Titel</Option>
                                <Option value="up">Sortiere nach Preis (auf)</Option>
                                <Option value="down">Sortiere nach Preis (ab)</Option>
                            </Select>

                        </Row>


                        <Row type="flex" justify="center">
                            {window.CS.getBMState().productsLimited.map(product => <PagedArticles key={product._id} product={product} />)}
                        </Row>
                    </div>
                </div>
            </div>
        );
    }

    handleSort(event: any) {
        switch (event) {
            case 'title': {

                let productList = Array.from(window.CS.getBMState().productsLimited).sort((a: IProductData, b: IProductData) => a.title.localeCompare(b.title));

                const action: IProductsLimitedAction = {
                    type: ActionType.update_limited_list,
                    products: productList
                }
                window.CS.clientAction(action);
                break;
            }
            case 'up': {
                let productList = Array.from(window.CS.getBMState().productsLimited).sort((a: IProductData, b: IProductData) => a.price - b.price);
                const action: IProductsLimitedAction = {
                    type: ActionType.update_limited_list,
                    products: productList
                }
                window.CS.clientAction(action);
                break;
            }
            case 'down': {
                let productList = Array.from(window.CS.getBMState().productsLimited).sort((a: IProductData, b: IProductData) => b.price - a.price);
                const action: IProductsLimitedAction = {
                    type: ActionType.update_limited_list,
                    products: productList
                }
                window.CS.clientAction(action);
                break;
            }
        }




    }

    handleSearch(e:any){
        console.log(e)
        window.CS.clientAction(searchAnything(e))
    }


}

