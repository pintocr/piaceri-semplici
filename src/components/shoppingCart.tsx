import React from 'react';
import { Modal, Button, Icon, Badge, Row, InputNumber, message }from 'antd'
import { Link } from 'react-router-dom';

//redux
import { IAction, ActionType } from '../framework/IAction';
import { IWindow } from '../framework/IWindow'
declare let window: IWindow;


interface IProps {
  stateCounter: number
}



interface IState {
    shoppingLoading: boolean;
    shoppingVisible: boolean;
}

export interface ICountAction extends IAction{
    indexOfItem : number;
    delta : number;
}

export interface IDeleteOneLine extends IAction {
    indexOfLine : number;
}

export default class ShoppingCartModal extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onChangePlus = this.onChangePlus.bind(this);
        this.onChangeMinus = this.onChangeMinus.bind(this);
        this.calculateSum = this.calculateSum.bind(this);
        this.calculateProductSum = this.calculateProductSum.bind(this);
        this.deleteLine = this.deleteLine.bind(this);

        this.state = {
            shoppingLoading: false,
            shoppingVisible : window.CS.getUIState().shoppingVisible,
                };
    };




    showModal = () => {
        const action: IAction = {
            type: ActionType.openShoppingcart
          }
        window.CS.clientAction(action);
        this.setState({ shoppingVisible: window.CS.getUIState().shoppingVisible });
      };
    
    
      handleCancel = () => {
        const action: IAction = {
            type: ActionType.closeShoppingcart
          }
        window.CS.clientAction(action);
        this.setState({ shoppingVisible: window.CS.getUIState().shoppingVisible });
      };

      onChangePlus = (event : any) => {
          const action: ICountAction = {
              type: ActionType.changeSpecificAmount,
              indexOfItem: parseInt(event.target.name),
              delta: 1
              
          }
          window.CS.clientAction(action);
      }

      onChangeMinus = (event : any) => {
        const action: ICountAction = {
            type: ActionType.changeSpecificAmount,
            indexOfItem: parseInt(event.target.name),
            delta: -1
            
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

    deleteLine = (event : any) => {
        const action: IDeleteOneLine = {
            type: ActionType.deleteLine,
            indexOfLine: parseInt(event.target.name)
        }
        window.CS.clientAction(action);
    }


    
      render() {
        const { shoppingLoading } = this.state;
        const visible =  window.CS.getUIState().shoppingVisible;
        return (
          <div>
            <Badge count={window.CS.getBMState().shoppingCart.items.length as any}>
            <Button style={{ "backgroundColor": "rgb(71, 38, 21)", "fontSize": "1.0rem", "borderColor": "white" }} type="primary" onClick={this.showModal}>
            <Icon type="shopping-cart" style={{ fontSize: '24px' }} />
            </Button>
            </Badge>
            <Modal
              visible={visible}
              title= "Warenkorb"
              onOk={this.handleCancel}
              onCancel={this.handleCancel}
              footer={[
                <Button key="back" onClick={this.handleCancel}>
                  Weiter einkaufen
                </Button>,
                <Link to={'/payment'}>
                <Button style={{ "backgroundColor": "rgb(71, 38, 21)" }} form = "loginForm" key="submit" type="primary" loading={shoppingLoading} onClick={this.handleCancel}>
                  Zur Kasse
                </Button>,
                </Link>
              ]}
            >  

            <Row type="flex" justify="center" style = {{flexDirection : "column"}}>

             {window.CS.getBMState().shoppingCart.items.map((element, index) => <div>
                <Row type="flex" justify="center">
                 <p>{element.title}</p>&nbsp;
                 <p>Einzelpreis: {element.price} €</p>&nbsp;
                 <Button name={"" + index} size="small" onClick={this.onChangeMinus} type="primary" style={{backgroundColor: "#472615", borderColor: "#472615"}}>
                    -
                </Button>&nbsp;

                <InputNumber size="small" min={1} max={100} value={window.CS.getBMState().shoppingCart.items[index].count} disabled= {true} defaultValue={1} style={{ width: '2.5rem', color: "black", backgroundColor: "white" }} />&nbsp;

                <Button name={"" + index} id={"minus" + index} size="small" onClick={this.onChangePlus} type="primary" style={{backgroundColor: "#472615", borderColor: "#472615"}}>
                    +
                </Button>&nbsp;
                <p>Gesamtpreis: {this.calculateProductSum(element.price, element.count )}</p>&nbsp;

                <Button name={"" + index} onClick={this.deleteLine} size="small"><span  style={{color: "red"}}><Icon type="close" /></span></Button>&nbsp;
                
                </Row>

                
                </div>)}

            </Row>


              <p>Zwischensumme: {this.calculateSum()} €</p>&nbsp;

            </Modal>
          </div>
        );
      }

}
