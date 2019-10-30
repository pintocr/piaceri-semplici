import React from 'react';
import '../stylesheets/details.scss';
import { InputNumber, Button, Icon, message, Row, Checkbox, Col, Card } from 'antd';
import { IProduct } from './categoryPage'
import { IDeleteOneLine, ICountAction } from './shoppingCart'
import DatePicker from "react-datepicker";

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
}


export interface IShoppingCartAction extends IAction {
    productId: string;
    amount: number;
    title: string;
    price: number;
}



export default class PaymentPage extends React.PureComponent<IProps, IState>  {


    constructor(props: any) {
        super(props);
        this.onChangePlus = this.onChangePlus.bind(this);
        this.onChangeMinus = this.onChangeMinus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isWeekday = this.isWeekday.bind(this);
        this.slowDHL = this.slowDHL.bind(this);
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
            deliveryDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            checkBoxStatus: [false, false, false, false, false]
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


    render() {


        return (

            <div className="overview">

                <Card
                    hoverable
                    style={{ width: 550, margin: 5, cursor: 'default' }}
                >
                    <h2>Ihr Warenkorb</h2>

                    <Row type="flex" justify="start" style={{ flexDirection: "row", margin: 5, color: 'white', backgroundColor: 'rgb(71, 38, 21)' }}>
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
                    <h2>Versand</h2>
                    <p>Kostenlose Lieferung</p>
                    <div>
                        <Checkbox name="DHL" checked={this.state.checkBoxStatus[0]} onChange={this.checkBoxChange}>DHL</Checkbox>&nbsp;
                    <img src="../img/DHL.jpg"></img>&nbsp;
                    <p>Voraussichtlicher Liefertermin</p>
                        <DatePicker disabled={true} selected={this.slowDHL()} onChange={this.handleChange} filterDate={this.isWeekday} />
                    </div>

                    <div>
                        <Checkbox name="DHL_EXPRESS" checked={this.state.checkBoxStatus[1]} onChange={this.checkBoxChange}>DHL Express</Checkbox>&nbsp;
                    <img src="../img/DHL_Express.jpg"></img>&nbsp;
                    <p>Wunschliefertermin</p>
                        <DatePicker selected={this.state.deliveryDate} onChange={this.handleChange} filterDate={this.isWeekday} />
                    </div>
                </Card>
                <Card
                    hoverable
                    style={{ width: 550, margin: 5, cursor: 'default'}}
                >
                    <h2>Zahlung</h2>
                    <div>
                        <Checkbox name="Lastschrift" checked={this.state.checkBoxStatus[2]} onChange={this.checkBoxChange}>Lastschrift</Checkbox>&nbsp;
                <img src="../img/Kauf_auf_Lastschrift.png"></img>&nbsp;
                </div>

                    <div>
                        <Checkbox name="Kreditkarte" checked={this.state.checkBoxStatus[3]} onChange={this.checkBoxChange}>Kreditkarte</Checkbox>&nbsp;
                <img src="../img/logo-visa.png"></img>&nbsp;
                </div>

                    <div>
                        <Checkbox name="Paypal" checked={this.state.checkBoxStatus[4]} onChange={this.checkBoxChange}>Paypal</Checkbox>&nbsp;
                <img src="../img/paypal.png"></img>&nbsp;
                </div>
                </Card>

                <Card
                    hoverable
                    style={{ width: 550, margin: 5, cursor: 'default' }}
                >
                    <Button>Zurück</Button>&nbsp;
                <Button>Weiter</Button>&nbsp;
                </Card>



            </div>
        )
    }


}