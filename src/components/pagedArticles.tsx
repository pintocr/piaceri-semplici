import React from 'react';
import "antd/dist/antd.css";
import "../stylesheets/pages.scss";
import { Card, Icon, Rate, Button, message } from 'antd';
import { IProductData } from '../App';
import { Link } from 'react-router-dom';


const cardStyle = { width: 240, height: 500, margin: 12, border: 'none', overflow: 'hidden', backgroundColor: '#472615' }
const bodyStyle = { backgroundColor: '#472615' }
const iconStyle = { fontSize: 25, color: 'white' }

interface IProps {
    product: IProductData
}

interface IState { }

export default class PagedArticles extends React.PureComponent<IProps, IState> {

    render() {
        const path: string = process.env.REACT_APP_BACKEND + '/images/' + this.props.product.pic_list[0];
        const price: string = Number(this.props.product.price).toLocaleString('de', { style: 'currency', currency: 'EUR' })
        return (
            <div>

                <Card
                    hoverable
                    style={cardStyle}
                    bodyStyle={bodyStyle}
                    cover={
                        <Link to={'/detailpage/' + this.props.product._id}>
                            <div className="pics"><img alt={this.props.product.title} src={path} id={this.props.product._id} /></div>
                        </Link>}>

                    <div className="metaStyle">
                        <Link to={'/detailpage/' + this.props.product._id}>
                            <b>{this.props.product.title}</b><br />
                            {price}<br />
                            {this.props.product.manufacturer}<br /><br />
                        </Link>
                        <Button onClick={this.onChangeBasket} type="primary" style={{ backgroundColor: "#472615", borderColor: "#472615" }}>
                            <Icon type="shopping-cart" style={{ fontSize: '20px' }} />
                            In den Warenkorb
                            </Button>
                    </div>

                    <Rate disabled allowHalf style={{ color: '#D4AF37' }} defaultValue={4.5} />
                </Card>
                {/* </Link> */}

            </div>

        );
    }

    onChangeBasket = () => {
        message.success("Der Artikel wurde erfolgreich in den Warenkorb gelegt");
    }
}
