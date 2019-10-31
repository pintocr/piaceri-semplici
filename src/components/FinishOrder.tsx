import React from 'react';
import '../stylesheets/details.scss';
import { Input, Button, Icon, message, Row, Checkbox, Col, Card} from 'antd';
import {IProduct} from './categoryPage';
import Address from './Addresses';
import {IDeleteOneLine, ICountAction } from './shoppingCart'
import CreateAddress from './CreateAddress';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import mongoose from 'mongoose'
 
import "react-datepicker/dist/react-datepicker.css";

//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
import { ObjectId } from 'bson';

declare let window: IWindow;

interface IProps {
    stateCounter: number;
}

interface IOrder {
    description: string,
    total_price: number,
    product_list: Array<Object>,
    ref_address: string,
    ref_user: string
}

interface IproductList {
    ref_product : string,
    amount : number
}

interface IState {
    amount : number;
    product : IProduct;
    checkBoxStatus: Array<boolean>;
    redirect : boolean;
}


export interface IShoppingCartAction extends IAction {
    productId: string;
    amount : number;
    title: string;
    price: number;
  }



export default class FinishOrder extends React.PureComponent<IProps, IState>  {


    constructor(props : any) {
        super(props);

        this.continue = this.continue.bind(this);
        this.calculateSum = this.calculateSum.bind(this);
        this.mapProducts = this.mapProducts.bind(this);
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
            checkBoxStatus : [false, false, false, false, false],
            redirect : false
        }
    };


    checkBoxChange = (event : any) => {

    let num : number = parseInt(event.target.name);
    let checkboxes : Array<boolean> = this.state.checkBoxStatus 

    checkboxes.forEach(function(element, index) 
     {
         if(index == num){
            checkboxes[index] = true;
            } else {
                checkboxes[index] = false;
            }
        });
    this.setState({ checkBoxStatus: [...checkboxes] });
    }

    calculateSum = () => {
        let sum = 0;
        window.CS.getBMState().shoppingCart.items.forEach(element => {
            sum = sum + element.price * element.count;
        })

        return Math.round(sum * 100) / 100;
    }

    mapProducts = () => {
       let newArray : Array<IproductList> = []
       window.CS.getBMState().shoppingCart.items.forEach(element => {
            newArray.push({ref_product : element.product_id,
                amount : element.count});
        })
        return newArray;
    }

    continue = () => {
            if(this.state.checkBoxStatus.indexOf(true) === -1){
                message.error("Bitte wählen sie eine Adresse aus");
            } else {

            const input : IOrder = {
                description: "Order to home of customer",
                total_price: this.calculateSum(),
                product_list: this.mapProducts(),
                ref_address: window.CS.getUIState().addresses[0]._id,
                ref_user: window.CS.getUIState().user._id
            }
            console.log(input)

                axios.post(`${process.env.REACT_APP_BACKEND}/order/add`, input)
                .then(res => {
                    const action: IAction = {
                        type: ActionType.deleteShoppingCart
                    }
                    window.CS.clientAction(action)
                    this.setState({ redirect: true });
                    message.success("Ihre Bestellung war erfolgreich");
                })
                .catch(error => { console.log(error);});              
            }
    }


    createAddress() {
        const action: IAction = {
            type: ActionType.show_Address_Form
        }
        window.CS.clientAction(action)
    }



    render(){
        if(this.state.redirect){
            return(<Redirect to = "/"/>)
        } else {
            if (window.CS.getUIState().showCreateAddressForm === false) {
                const size = 'large'
                return (
                    <div>
                            <div>
                                <table className="account-table">
                                    <tr>
                                        <th>Wählen Sie eine Adresse<br /><br /></th>
                                    </tr>
                                    <tr>
                                        <td><p>Empfänger:</p>&nbsp;</td>
                                        <td><p>{window.CS.getUIState().user.user_first_name}, {window.CS.getUIState().user.user_last_name}</p>&nbsp;</td>
                                    </tr>
                                    {window.CS.getUIState().addresses.map((address, index) =>
                                        <tr><td>
                                            <Checkbox name ={"" + index} checked = {this.state.checkBoxStatus[index]} onChange={this.checkBoxChange}><Address key={address._id} address={address} stateCounter={window.CS.getUIState().counter} /></Checkbox>&nbsp;
                                        </td></tr>)}
        
                                    <tr>
                                        <td>
                                            <Button type="primary" size={size} onClick={this.createAddress}>
                                                <Icon type="plus-square" />Addresse hinzufügen
                                        </Button>
                                        </td>
                                    </tr>
                                </table>
        
                            </div>
        
                        <Link to="/payment">
                            <Button>Zurück</Button>&nbsp;
                            </Link>
            
                            <Button onClick = {this.continue}>Zahlungspflichtig bestellen</Button>&nbsp;
                    </div>
                )
            }else if (window.CS.getUIState().showCreateAddressForm === true) {
                return (
                    <div>
                        <CreateAddress stateCounter={window.CS.getUIState().counter} />
                    </div>
                )
            }
        }

    
    }


}