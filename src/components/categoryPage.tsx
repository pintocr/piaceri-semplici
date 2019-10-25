import React from 'react';
import Axios from 'axios';
import "antd/dist/antd.css";
import '../stylesheets/pages.scss';
import { Card, Col, Row } from 'antd';
import PagedArticles from './pagedArticles';


interface ICategory {
    _id: String;
    name: String;
    description: String;
    pic_list: String[];
}

interface IProduct {
    _id: string;
    title: string;
    product_id: string;
    description: string;
    manufacturer: string;
    price: number;
    amount: number;
    unit: string;
    ref_category: string;
    pic_list: string[];
    rating: number;
}

interface IState {
    categoryId: String;
    categoryDescription: String;
    pictureList: string[];
    products: [];
}
interface IProps {
    category: String;
    stateCounter: number
}

export default class CategoryPage extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            categoryId: '',
            categoryDescription: '',
            pictureList: [],
            products: [],
        }
    }

    componentDidMount() {

        Axios.get(`${process.env.REACT_APP_BACKEND}/category`)
            .then(res => {
                let categoryInfo = res.data.filter((cat: ICategory) => cat.name === this.props.category)[0];
                this.setState({
                    categoryId: categoryInfo._id,
                    categoryDescription: categoryInfo.description,
                    pictureList: categoryInfo.pic_list.map((pic: String) =>
                        process.env.REACT_APP_BACKEND + '/images/' + pic)
                });

                Axios.get(`${process.env.REACT_APP_BACKEND}/product`)
                    .then(res => {
                        let productList = res.data.filter((product: IProduct) => product.ref_category === this.state.categoryId);

                        this.setState({ products: productList })

                    })
            })
    }


    render() {
        console.log("Category rendered()");
        return (
            <div>

                <div className="image-wrapper">
                    <div className="description">{this.state.categoryDescription}</div>
                    <div className="images image1"><img src={this.state.pictureList[0]} alt="pic" /></div>
                    <div className="images image2"><img src={this.state.pictureList[1]} alt="pic" /></div>
                    <div className="images image3"><img src={this.state.pictureList[2]} alt="pic" /></div>
                    <div className="images image4"><img src={this.state.pictureList[3]} alt="pic" /></div>
                </div>
              
                <div className="product-container">
             
                    <Row type="flex" justify="center">

                        {this.state.products.map((product: IProduct) =>  <PagedArticles key={product._id} product={product} />)}

                    </Row>
                </div>

            </div>
        )
    }

}