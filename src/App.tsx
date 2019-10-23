import React from 'react';
import { Input } from 'antd';
import "antd/dist/antd.css";
import StartPageArticles from './components/startPageArticles';
import { IAction, ActionType } from './framework/IAction';
import { IWindow } from './framework/IWindow'
import axios from 'axios';
declare let window: IWindow;
const { Search } = Input;

interface IProps {
  stateCounter: number
}

interface IState {
  products: IProductData[]
}

export interface IProductData {
  _id: string;
  product_id: String;
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

export default class App extends React.PureComponent<IProps, IState> {

componentDidMount() {
    window.CS.clientAction(productsReadActionCreator())
  }

  render() {
    return (
      <div>
        <div className="App">
          <div className="Searchbox">
            <p>Artikelsuche</p>
            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton /></div>
          <div>
            <p>Exclusive Selection</p>
            {window.CS.getBMState().products.map(product => <StartPageArticles key={product._id} product={product} />)}
          </div>
        </div>
      </div>

    );
    //
  }
}

export interface IProductsLoadedAction extends IAction {
  products: IProductData[]
}

export function productsReadActionCreator() {
  return function (dispatch: any) {
    const uiAction: IAction = {
      type: ActionType.server_called
    }
    dispatch(uiAction);
    //${process.env.REACT_APP_BACKEND}
    axios.get(`${process.env.REACT_APP_BACKEND}/product/`).then(response => {
      console.log("this data was loaded as a result of componentDidMount:");
      console.log(response.data);
      const responseAction: IProductsLoadedAction = {
        type: ActionType.add_products_from_server,
        products: response.data as IProductData[]
      }
      dispatch(responseAction);
    }).catch(function (error) { console.log(error); })
  }
}