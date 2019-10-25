import React from 'react';
import { RouteComponentProps } from 'react-router';
import Axios from 'axios';

interface IProps {
}

interface IState {
}

interface IParams {
    id : string;
}

export default class DetailPage extends React.PureComponent<IProps & RouteComponentProps, IState> {


    componentDidMount() {
        const para = this.props.match.params as IParams;
        console.log(para.id);
                Axios.get(`${process.env.REACT_APP_BACKEND}/product/${para.id}`)
                    .then(res => { console.log(res)})
     }

    render(){
        return(
            <div>
                Hello World!
            </div>
        ) 
    }


}