import React from 'react';
import '../stylesheets/details.scss';
import { Input, Button, Icon, message, Row, Checkbox, Col, Card} from 'antd';
import {IProduct} from './categoryPage';
import Address from './Addresses';
import {IDeleteOneLine, ICountAction } from './shoppingCart'
import CreateAddress from './CreateAddress';
import { Link } from 'react-router-dom';
 
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
            checkBoxStatus : [false, false, false, false, false]
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
        if(window.CS.getBMState().shoppingCart.items.length <= 0){
            message.error("Sie haben keine Artikel in ihrem Warenkorb");
        } else if (this.state.checkBoxStatus[0] === false && this.state.checkBoxStatus[1] === false) {
            message.error("Sie haben keine Versandart aufgewählt");
        } else if (this.state.checkBoxStatus[2]=== false && this.state.checkBoxStatus[3]=== false && this.state.checkBoxStatus[4]=== false){
            message.error("Sie haben keine Zahlungsart ausgewählt");
        } else if (window.CS.getUIState().loggedIn === false){
            message.error("Sie müssen angemeldet sein um zu bestellen");
            const action: IAction = {
                type: ActionType.openLoginModal
              }
              window.CS.clientAction(action);
        } else {
            message.success("saving order in DB");
        }
    }


    createAddress() {
        const action: IAction = {
            type: ActionType.show_Address_Form
        }
        window.CS.clientAction(action)
    }



    render(){
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