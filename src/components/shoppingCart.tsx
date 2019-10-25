import React from 'react';


interface IProps {
    stateCounter: number
}

interface IState { }

export default class ShoppingCart extends React.PureComponent<IProps, IState> {

    render() {
        return (
            <div>
                <div className="shoppingCart">
                    <div className="sCItems">
                        
                    </div>
                </div>
            </div>

        );
    }
}