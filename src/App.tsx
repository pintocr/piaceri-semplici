import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import { IAction, ActionType } from './framework/IAction';
import axios from 'axios';
import { IWindow } from './framework/IWindow';
import { Route} from 'react-router-dom';
import DetailPage from './components/DetailPage'
import CategoryPage from './components/categoryPage'
import NavBar from './components/NavBar';
import OnloadProducts from './components/OnloadProducts';
import AccountSettings from './components/AccountSettings'
import PaymentPage from './components/Payment';
declare let window: IWindow;

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

interface ICategoryData {
  _id: string;
  name: string;
  description: string;
  pic_list: string[];
}

export default class App extends React.PureComponent<IProps, IState> {

/*   constructor(props: any) {
    super(props);
  } */
  componentDidMount() {
    window.CS.clientAction(categoriesReadActionCreator())
    window.CS.clientAction(productsReadActionCreator())
  }

  render() {
    console.log("App rendered()");

    return (

      <div>
        <NavBar stateCounter={window.CS.getUIState().counter} />
        <Route path="/whiskey"><CategoryPage stateCounter={window.CS.getUIState().counter} category="Whiskey" /></Route>
            <Route path="/chocolate"><CategoryPage stateCounter={window.CS.getUIState().counter} category="Chocolate" /></Route>
            <Route path="/coffee"><CategoryPage stateCounter={window.CS.getUIState().counter} category="Coffee"/></Route>
            <Route path="/account"><AccountSettings stateCounter={window.CS.getUIState().counter} /></Route>
            <Route path="/detailpage/:id" render={(props) => <DetailPage {...props} />}/>  
            <Route exact path="/"><OnloadProducts limitedList={window.CS.getBMState().productsLimited} /></Route>
            <Route path="/payment" render ={ () => <PaymentPage stateCounter={window.CS.getUIState().counter}/>} />
      </div>

    );
  }
}

export interface IProductsLoadedAction extends IAction {
  products: IProductData[]
}

export interface IProductsLimitedAction extends IAction {
  products: IProductData[]
}
export interface IProductsSearchedAction extends IAction {
  products: IProductData[]
}

export function productsReadActionCreator() {
  return function (dispatch: any) {
    const uiAction: IAction = {
      type: ActionType.server_called
    }
    dispatch(uiAction);
    axios.get(`${process.env.REACT_APP_BACKEND}/product/`).then(response => {
      console.log("this data was loaded as a result of componentDidMount:");

      //console.log(response.data);
      const responseAction: IProductsLoadedAction = {
        type: ActionType.add_products_from_server,
        products: response.data as IProductData[]
      }
      dispatch(responseAction);
      window.CS.clientAction(limitedProductsActionCreator())
    }).catch(function (error) { console.log(error); })
  }
}

export interface ICategoriesLoadedAction extends IAction {
  categories: ICategoryData[]
}

export function categoriesReadActionCreator() {
  return function (dispatch: any) {
    const uiAction: IAction = {
      type: ActionType.server_called
    }
    dispatch(uiAction);
    axios.get(`${process.env.REACT_APP_BACKEND}/category`).then(response => {
      console.log("this data was loaded as a result of componentDidMount:");
      console.log(response.data);
      const responseAction: ICategoriesLoadedAction = {
        type: ActionType.add_categories_from_server,
        categories: response.data as ICategoryData[]
      }
      dispatch(responseAction);
    }).catch(function (error) { console.log(error); })
  }
}

export function limitedProductsActionCreator() {
  return function (dispatch: any) {
      const action: IProductsLimitedAction = {
        type: ActionType.update_limited_list,
        products: window.CS.getBMState().products.slice(9) as IProductData[]
      }
      window.CS.clientAction(action);
    }
   
  }


  export function searchAnything(search:string){
    return function (dispatch: any) {
      const uiAction: IAction = {
        type: ActionType.server_called
      }
      dispatch(uiAction);
      axios.get(`${process.env.REACT_APP_BACKEND}/product/searchProducts/${search}`).then(response => {
       
        if(response.data !== null ){
        const responseAction: IProductsSearchedAction = {
          type: ActionType.add_searched_Products,
          products: response.data as IProductData[]
        }
      
        dispatch(responseAction);
      }else{window.CS.clientAction(limitedProductsActionCreator())}
      }).catch(function (error) { console.log(error); })
    }
  }