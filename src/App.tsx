import React from 'react';
import './App.css';
import { Input } from 'antd';
import "antd/dist/antd.css";
import StartPageArticles from './components/startPageArticles';
import { IAction, ActionType } from './framework/IAction';
import { IWindow } from './framework/IWindow'
import axios from 'axios';
import responsiveObserve from 'antd/lib/_util/responsiveObserve';
import mongoose, { Document } from 'mongoose';
declare let window: IWindow;
const { Search } = Input;

interface IProps {

}

interface IState {
  products: IProductData[]
}

export interface IProductData extends Document {
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

export default class App extends React.PureComponent<IProps, IState> {


  componentDidMount() {
    window.CS.clientAction(productsReadActionCreator())
  }

  render() {
    const productArr: IProductData[] = JSON.parse(JSON.stringify(window.CS.getBMState().products));
   
    console.log(productArr.slice(9))
    return (
      <div>
        <div className="App">
          <div className="Searchbox">
            <p>Artikelsuche</p>
            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton /></div>
          <div>
            <p>Exclusive Selection</p>
            {window.CS.getBMState().products.slice(9).map(product => <StartPageArticles key={product._id} product={product} />)}
          </div>
        </div>
      </div>

    );
  }
}
// {window.CS.getBMState().products.map(product => <StartPageArticles key={product._id} product={product} />)}

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
      console.log(typeof response.data)
      const objectArr :IProductData[] = JSON.parse(JSON.stringify(response.data))
        /*for(let i=0;i<objectArr.length;i++){
          const obj = objectArr[i].toObject;
          console.log(obj)
        }*/
      
      const responseAction: IProductsLoadedAction = {
        type: ActionType.add_products_from_server,
        products: objectArr as IProductData[]
      }
      dispatch(responseAction);

    }).catch(function (error) { console.log(error); })
  }
}