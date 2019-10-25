
import React from 'react';
import './App.css';
import { Input } from 'antd';
import "antd/dist/antd.css";
import StartPageArticles from './components/pagedArticles';
import { IAction, ActionType } from './framework/IAction';
import axios from 'axios';
import responsiveObserve from 'antd/lib/_util/responsiveObserve';
import mongoose, { Document } from 'mongoose';
import { IWindow } from './framework/IWindow';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import CategoryPage from './components/categoryPage'
import NavBar from './components/NavBar';
import OnloadProducts from './components/OnloadProducts';
import AccountSettings from './components/AccountSettings'
declare let window: IWindow;
const { Search } = Input;

interface IProps {
  stateCounter: number
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
  pic_list: string[];
}

export default class App extends React.PureComponent<IProps, IState> {

  constructor(props: any) {

    super(props);


  }
  componentDidMount() {
    window.CS.clientAction(productsReadActionCreator())
  }

  render() {
    //const productArr: IProductData[] = JSON.parse(JSON.stringify(window.CS.getBMState().products));
    //            <Route path="/coffee" component={Coffee} />
    //            <Route path="/" component={OnloadProducts} />
    console.log("App rendered()");

    return (

      <div>
        <NavBar stateCounter={window.CS.getUIState().counter} />
        <div className="Searchbox">
          <h2>Artikelsuche </h2>
          <Search placeholder="Artikelname hier eingeben" onSearch={value => console.log(value)} enterButton /></div>
        <div>
        
            <Route path="/whiskey"><CategoryPage stateCounter={window.CS.getUIState().counter} category="Whiskey" /></Route>
            <Route path="/chocolate"><CategoryPage stateCounter={window.CS.getUIState().counter} category="Chocolate" /></Route>
            <Route path="/coffee"><CategoryPage stateCounter={window.CS.getUIState().counter} category="Coffee"/></Route>
            <Route path="/account"><AccountSettings stateCounter={window.CS.getUIState().counter} /></Route>
            <Route exact path="/" component={OnloadProducts} />
       
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
      const responseAction: IProductsLoadedAction = {
        type: ActionType.add_products_from_server,
        products: response.data as IProductData[]
      }
      dispatch(responseAction);
    }).catch(function (error) { console.log(error); })
  }
}