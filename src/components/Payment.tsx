import React from 'react';
import '../stylesheets/details.scss';
import { InputNumber, Button, Icon, message, Row, Checkbox, Col, Card} from 'antd';
import {IProduct} from './categoryPage'
import {IDeleteOneLine, ICountAction } from './shoppingCart'
import { Link, Redirect } from 'react-router-dom';
import DatePicker from "react-datepicker";
import axios from 'axios';
import {IAddressData } from '../state/appState'


 
import "react-datepicker/dist/react-datepicker.css";

//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;

interface IProps {
    stateCounter: number;
}

interface IState {
    amount: number;
    product: IProduct;
    today: Date;
    deliveryDate: Date;
    checkBoxStatus: Array<boolean>;
    redirect: boolean
}


export interface IShoppingCartAction extends IAction {
    productId: string;
    amount: number;
    title: string;
    price: number;
}

  export interface IAddressAction extends IAction {
    addresses: IAddressData[]
}

  export interface IAddressAction extends IAction {
    addresses: IAddressData[]
}


  export default class PaymentPage extends React.PureComponent<IProps, IState>  {


    constructor(props: any) {
        super(props);
        this.onChangePlus = this.onChangePlus.bind(this);
        this.onChangeMinus = this.onChangeMinus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isWeekday = this.isWeekday.bind(this);
        this.slowDHL = this.slowDHL.bind(this);
        this.continue = this.continue.bind(this);
        this.state = {
            amount: 1,
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
            today: new Date(),
            deliveryDate : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            checkBoxStatus : [false, false, false, false, false],
            redirect : false
        }
    };



    onChangePlus = (event: any) => {
        const action: ICountAction = {
            type: ActionType.changeSpecificAmount,
            indexOfItem: parseInt(event.target.name),
            delta: 1

        }
        window.CS.clientAction(action);
    }

    onChangeMinus = (event: any) => {
        const action: ICountAction = {
            type: ActionType.changeSpecificAmount,
            indexOfItem: parseInt(event.target.name),
            delta: -1

        }
        window.CS.clientAction(action);
    }


    onChangeBasket = () => {
        message.success("Der Artikel wurde erfolgreich in den Warenkorb gelegt");

        const action: IShoppingCartAction = {
            type: ActionType.addToShoppingCart,
            productId: this.state.product._id,
            amount: this.state.amount,
            title: this.state.product.title,
            price: this.state.product.price,
        }

        window.CS.clientAction(action);
    }

    calculateSum = () => {
        let sum = 0;
        window.CS.getBMState().shoppingCart.items.forEach(element => {
            sum = sum + element.price * element.count;
        })

        return Math.round(sum * 100) / 100;
    }

    calculateProductSum = (price: number, count: number) => {
        return Math.round((price * count) * 100) / 100;
    }

    deleteLine = (event: any) => {
        const action: IDeleteOneLine = {
            type: ActionType.deleteLine,
            indexOfLine: parseInt(event.target.name)
        }
        window.CS.clientAction(action);
    }

    handleChange = (date: any) => {
        this.setState({
            deliveryDate: date
        });
    };

    isWeekday = (date: any) => {
        const day = date.getDay();
        return day !== 0 && date >= this.state.today;
    };

    slowDHL = () => {
        return new Date(this.state.today.getTime() + 72 * 60 * 60 * 1000)
    }

    checkBoxChange = (event: any) => {
        switch (event.target.name) {
            case "DHL":
                this.setState({ checkBoxStatus: [true, false, this.state.checkBoxStatus[2], this.state.checkBoxStatus[3], this.state.checkBoxStatus[4]] });
                break;
            case "DHL_EXPRESS":
                this.setState({ checkBoxStatus: [false, true, this.state.checkBoxStatus[2], this.state.checkBoxStatus[3], this.state.checkBoxStatus[4]] });
                break;
            case "Lastschrift":
                this.setState({ checkBoxStatus: [this.state.checkBoxStatus[0], this.state.checkBoxStatus[1], true, ...[false]] });
                break;
            case "Kreditkarte":
                this.setState({ checkBoxStatus: [this.state.checkBoxStatus[0], this.state.checkBoxStatus[1], false, true, false] });
                break;
            case "Paypal":
                this.setState({ checkBoxStatus: [this.state.checkBoxStatus[0], this.state.checkBoxStatus[1], false, false, true] });
                break;
        }

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

            axios.get(`${process.env.REACT_APP_BACKEND}/address/getAddressData/${window.CS.getUIState().user._id}`).then(response => {
                console.log("address data", response.data);
                const responseAction: IAddressAction = {
                    type: ActionType.get_address_data,
                    addresses: response.data.addressData as IAddressData[]
                }
                window.CS.clientAction(responseAction);
            }).catch(function (error) { console.log(error); })


            this.setState({ redirect: true });
        }
    }

render() {
    if(this.state.redirect){
        return(<Redirect to = "/FinishOrder"/>)
    } else {

        return (
            <div className="overview">

                <Card
                    hoverable
                    style={{ width: 550, margin: 5, cursor: 'default' }}
                >
                    <h2>Ihr Warenkorb</h2>

                    <Row type="flex" justify="start" style={{ flexDirection: "row", margin: 5, padding: 5, fontSize: '0.8rem' , color: 'white', backgroundColor: 'rgb(71, 38, 21)' }}>
                        <Col span={7}><b>Artikelname</b></Col>
                        <Col span={4} style={{ padding: '0 2 0 2' }}><b>Einzelpreis</b></Col>
                        <Col span={6}><b>Menge</b></Col>
                        <Col span={4}><b>Gesamt</b></Col>
                        <Col span={3}><b>löschen</b></Col>
                    </Row>

                    {window.CS.getBMState().shoppingCart.items.map((element, index) => <div>
                        <Row type="flex" justify="start" style={{ flexDirection: "row", margin: 5 }}>
                            <Col span={7}>{element.title}</Col>
                            <Col span={4}>{Number(element.price).toLocaleString('de', { style: 'currency', currency: 'EUR' })}</Col>
                            <Col span={6}>

                                <Button name={"" + index} size="small" onClick={this.onChangeMinus} type="primary" style={{ backgroundColor: "#472615", borderColor: "#472615" }}>
                                    -
                        </Button>&nbsp;
        
                        <InputNumber size="small" min={1} max={100} value={window.CS.getBMState().shoppingCart.items[index].count} disabled={true} defaultValue={1} style={{ width: '2.5rem', color: "black", backgroundColor: "white" }} />&nbsp;
        
                        <Button name={"" + index} id={"minus" + index} size="small" onClick={this.onChangePlus} type="primary" style={{ backgroundColor: "#472615", borderColor: "#472615" }}>
                                    +
                        </Button>&nbsp;
                        </Col>
                            <Col span={4}>{Number(this.calculateProductSum(element.price, element.count)).toLocaleString('de', { style: 'currency', currency: 'EUR' })}</Col>

                            <Col span={3}><Button name={"" + index} onClick={this.deleteLine} size="small"><span style={{ color: "red" }}><Icon type="close" /></span></Button>&nbsp;</Col>

                        </Row>
                    </div>)}

                    <Row type="flex" justify="start" style={{ flexDirection: "row", margin: 5, backgroundColor: '#FFEFD5' }}>
                        <Col span={17}><b>Zwischensumme: </b></Col>
                        <Col span={7}><b>{Number(this.calculateSum()).toLocaleString('de', { style: 'currency', currency: 'EUR' })}</b></Col>
                    </Row>
                    <Row type="flex" justify="start" style={{ flexDirection: "row", margin: 5, backgroundColor: '#FFEFD5' }}>
                        <Col span={17}><b>Lieferkosten: </b></Col>
                        <Col span={7}><b>0,00 €</b></Col>
                    </Row>
                    <Row type="flex" justify="start" style={{ flexDirection: "row", margin: 5, backgroundColor: '#FFEFD5' }}>
                        <Col span={17}><b>Gesamtsumme: </b></Col>
                        <Col span={7}><b>{Number(this.calculateSum()).toLocaleString('de', { style: 'currency', currency: 'EUR' })}</b></Col>
                    </Row>
                </Card>

                <Card
                    hoverable
                    style={{width: 550, margin: 5, cursor: 'default' }}
                >
                    <h2>Versandoptionen</h2>
                    <Row>
                        <Col span={2}><Checkbox name="DHL" checked={this.state.checkBoxStatus[0]} onChange={this.checkBoxChange}>
                                </Checkbox></Col>
                        <Col span={14}><b>DHL</b>
                                <p>Kostenlose Lieferung</p>
                                <p>Voraussichtliche Lieferung<br/>
                                <DatePicker disabled={true} selected={this.slowDHL()} onChange={this.handleChange} filterDate={this.isWeekday} />
                                </p></Col>
                    <Col span={8}><img src="../img/DHL.jpg"></img>&nbsp;</Col>
                    </Row>

                    <Row>
                    <Col span={8}></Col>
                    <Col span={14}>
                    
                    <br/><br/>
                    </Col>
                    </Row>


                   <Row>
                   <Col span={2}><Checkbox name="DHL_EXPRESS" checked={this.state.checkBoxStatus[1]} onChange={this.checkBoxChange}>
                            </Checkbox></Col>
                       <Col span={14}><b>DHL Express</b>
                            <p>Kostenpflichtiger Service</p>
                            <p>Wunschliefertermin<br/>
                            <DatePicker selected={this.state.deliveryDate} onChange={this.handleChange} filterDate={this.isWeekday} />
                            </p></Col>
                       <Col span={8}> <img src="../img/DHL_Express.jpg"></img>&nbsp;</Col>
                   </Row>
                    <div>
                        
                   
                   
                        
                    </div>
                </Card>
                <Card
                    hoverable
                    style={{ width: 550, margin: 5, cursor: 'default'}}
                >
                    <h2>Zahlungsmöglichkeiten</h2>
                    <div>
                        <Checkbox name="Lastschrift" checked={this.state.checkBoxStatus[2]} onChange={this.checkBoxChange}>Lastschrift</Checkbox>&nbsp;
                <img src="../img/Kauf_auf_Lastschrift.png"></img><br/><br/>
                </div>

                    <div>
                        <Checkbox name="Kreditkarte" checked={this.state.checkBoxStatus[3]} onChange={this.checkBoxChange}>Kreditkarte</Checkbox>&nbsp;
                <img src="../img/logo-visa.png"></img>&nbsp;<br/><br/>
                </div>

                    <div>
                        <Checkbox name="Paypal" checked={this.state.checkBoxStatus[4]} onChange={this.checkBoxChange}>Paypal</Checkbox>&nbsp;
                <img src="../img/paypal.png"></img>&nbsp;<br/><br/>
                </div>
                </Card>

                <Card
                    hoverable
                    style={{ width: 550, margin: 5, cursor: 'default' }}
                >
                    <Link to="/">
                    <Button>Zurück</Button>&nbsp;
                    </Link>
    
                    <Button onClick = {this.continue}>Weiter</Button>&nbsp;
                </Card>



            </div>
        )
                    }
    }


}
