import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Card, InputNumber, Button, Icon, message } from 'antd';
import {IProduct} from './categoryPage'
import Axios from 'axios';

//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;

interface IProps {
}

interface IState {
    amount : number;
    product : IProduct;
}

interface IParams {
    id : string;
}


export interface IShoppingCartAction extends IAction {
    productId: string;
    amount : number;
    title: string;
    price: number;
  }


export default class DetailPage extends React.PureComponent<IProps & RouteComponentProps, IState> {


    constructor(props : any) {
        super(props);
        this.onChangePlus = this.onChangePlus.bind(this);  
        this.onChangeMinus = this.onChangeMinus.bind(this);  
        this.state = {
            amount : 1,
            product: {
                _id: "",
                title: "",
                product_id: "",
                description: "",
                manufacturer: "",
                price: 0,
                amount: 0,
                unit: "",
                ref_category: "",
                pic_list: [],
                rating: 4,
            },
        }
    };


    componentDidMount() {
        const para = this.props.match.params as IParams;
        console.log(para.id);
                Axios.get(`${process.env.REACT_APP_BACKEND}/product/${para.id}`)
                    .then(res => {
                        this.setState({ product: {
                            _id: res.data._id,
                            title: res.data.title,
                            product_id: res.data.product_id,
                            description: res.data.description,
                            manufacturer: res.data.manufacturer,
                            price: res.data.price,
                            amount: res.data.amount,
                            unit: res.data.unit,
                            ref_category: res.data.ref_category,
                            pic_list: res.data.pic_list,
                            rating: res.data.rating,
                        } })
                        console.log(this.state.product.pic_list[0]);
                    });
     }

     onChangePlus = () => {
        this.setState({ amount: this.state.amount+1 });
      }

      onChangeMinus = () => {
        this.setState({ amount: this.state.amount-1 });
      }


      onChangeBasket = () => {
        message.success("Der Artikel wurde erfolgreich in den Warenkorb gelegt");

        const action: IShoppingCartAction = {
            type: ActionType.addToShoppingCart,
            productId : this.state.product._id,
            amount: this.state.amount,
            title: this.state.product.title,
            price: this.state.product.price,
          }

        window.CS.clientAction(action);
      }

    render(){
        return(
            <div style={{  display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Card hoverable style={{ width: 600 }}>
                    <div className="title">{this.state.product.title}<br />
                    </div>
                    <div className="pics">
                        <img src={process.env.REACT_APP_BACKEND + '/images/' + this.state.product.pic_list[0]} alt={this.state.product.title} style={{ width: 600 }} />
                    </div>
                    Hersteller: {this.state.product.manufacturer}&nbsp;
                    <div>{this.state.product.description}&nbsp;</div>
                    <br />
                </Card>   

                 <Card title="Kaufen" style={{ width: 400 }}>
                <p>Verfügbarkeit: </p><p><Icon type="check" /> Im Lager</p>&nbsp;
                <p>Preis: {this.state.product.price} €</p>
                <p>(inkl. Mwst, zzgl. Versandkosten)</p>
               
                <Button onClick={this.onChangeMinus} type="primary" style={{backgroundColor: "#472615", borderColor: "#472615"}}>
                    -
                </Button>&nbsp;

                <InputNumber min={1} max={100} value={this.state.amount} disabled= {true} defaultValue={1} style={{ width: '2.5rem', color: "black", backgroundColor: "white" }} />&nbsp;

                <Button onClick={this.onChangePlus} type="primary" style={{backgroundColor: "#472615", borderColor: "#472615"}}>
                    +
                </Button>&nbsp;
                <Button onClick={this.onChangeBasket} type="primary" style={{backgroundColor: "#472615", borderColor: "#472615"}}>
                    <Icon type="shopping-cart" style={{ fontSize: '20px' }}/>
                    In den Warenkorb
                </Button>

                 </Card>
            </div>
        ) 
    }


}