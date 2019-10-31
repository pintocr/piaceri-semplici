import React from 'react';
import '../stylesheets/details.scss';
import { Input, Button, Icon, message, Row, Checkbox, Col, Card} from 'antd';
import {IProduct} from './categoryPage';
import Address from './Addresses';
import {IDeleteOneLine, ICountAction } from './shoppingCart'
import CreateAddress from './CreateAddress';
import { Link, Redirect } from 'react-router-dom';
 
import "react-datepicker/dist/react-datepicker.css";

//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;

interface IProps {
    stateCounter: number;
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

    continue = () => {
            if(this.state.checkBoxStatus.indexOf(true) === -1){
                message.error("Bitte wählen sie eine Adresse aus");
            } else {
                const action: IAction = {
                    type: ActionType.deleteShoppingCart
                }
                window.CS.clientAction(action)
                this.setState({ redirect: true });
                message.success("Ihre Bestellung war erfolgreich");
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
                const size = 'small'
                return (
                    <div  className="finish">
                            <div>
                                
                                <table className="account-table">
                                    <tr>
                                        <th colSpan={2}>Wählen Sie eine Adresse<br /><br /></th>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}><p>Empfänger:&nbsp;{window.CS.getUIState().user.user_first_name} {window.CS.getUIState().user.user_last_name}</p></td>
                                    </tr>
                                    {window.CS.getUIState().addresses.map((address, index) =>
                                        <tr>
                                            <td><Checkbox name ={"" + index} checked = {this.state.checkBoxStatus[index]} onChange={this.checkBoxChange}/>
                                            </td>
                                            <td>
                                            <Address key={address._id} address={address} stateCounter={window.CS.getUIState().counter} />&nbsp;
                                        </td>
                                        </tr>)}
        
                                    <tr>
                                        <td colSpan={2}>
                                            <Button type="primary" className="accountButton" size={size} onClick={this.createAddress}>
                                                <Icon type="plus-square" />Addresse hinzufügen
                                        </Button>
                                        </td>
                                    </tr>
                                </table>
                               
                            </div>
        
                            <div>
                        <Link to="/payment">
                            <Button className="accountButton">Zurück</Button>&nbsp;
                            </Link>
            
                            <Button style={{color: 'white', backgroundColor: 'darkred'}} onClick = {this.continue}>Zahlungspflichtig bestellen</Button>&nbsp;

                            </div>
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