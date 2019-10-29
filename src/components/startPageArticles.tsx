import React from 'react';
import "antd/dist/antd.css";
import { Card } from 'antd';
import { IProductData } from '../App';
import {Link} from 'react-router-dom';

const { Meta } = Card;



interface IProps {
    product: IProductData
}

interface IState { }

export default class StartPageArticles extends React.PureComponent<IProps, IState> {

    render() {
        const path: string = process.env.REACT_APP_BACKEND+'/images/'+this.props.product.pic_list;
        return (
            <div>
                <Link to={'/detailpage/' + this.props.product._id}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt={this.props.product.title} src={path} id={this.props.product._id} />}>
                    <Meta title={this.props.product.title} description={this.props.product.price}/>
                </Card>
                </Link>


            </div>

        );
    }
}
