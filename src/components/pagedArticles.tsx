import React from 'react';
import "antd/dist/antd.css";
import "../stylesheets/pages.scss";
import { Card, Icon, Rate } from 'antd';
import { IProductData } from '../App';

const { Meta } = Card;

const cardStyle = {width: 240, height: 500, margin: 12, border: 'none', overflow: 'hidden', backgroundColor: '#472615'}
const bodyStyle = {backgroundColor: '#472615'}
const iconStyle = {fontSize: 25, color: 'white'}

interface IProps {
    product: IProductData
}

interface IState { }

export default class PagedArticles extends React.PureComponent<IProps, IState> {

    render() {
        const path: string = process.env.REACT_APP_BACKEND+'/images/'+this.props.product.pic_list[0];
        return (
            <div>
                <Card
                    hoverable
                    style={cardStyle}
                    bodyStyle={bodyStyle}
                    cover={<div className="pics"><img alt={this.props.product.title} src={path} id={this.props.product._id}/></div>}>
                        <div className="metaStyle">
                        <b>{this.props.product.title}</b><br/>
                        {this.props.product.price}<br/>
                        {this.props.product.manufacturer}<br/><br/>
                        <Icon type="shopping" theme="twoTone" twoToneColor="orange" style={iconStyle}/>
                        </div>
                        <Rate allowHalf defaultValue={4.5}/>
                </Card>


            </div>

        );
    }
}
