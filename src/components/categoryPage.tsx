import React from 'react';
import Axios from 'axios';
import "antd/dist/antd.css";
import '../stylesheets/pages.scss';
import '../index.css';
import { Row, Select, Input } from 'antd';
import PagedArticles from './pagedArticles';
import { IWindow } from '../framework/IWindow';
declare let window: IWindow;
const { Option } = Select;
const { Search } = Input;

const searchItemStyle = {
    width: 180, margin: 2
}

interface ICategory {
    _id: string;
    name: string;
    description: string;
    pic_list: string[];
}

export interface IProduct {
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
    categoryId: string;
    categoryDescription: string;
    pictureList: string[];
    products: IProduct[];
}
interface IProps {
    category: string;
    stateCounter: number
}

export default class CategoryPage extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.handleSort = this.handleSort.bind(this);

        this.state = {
            categoryId: '',
            categoryDescription: '',
            pictureList: [],
            products: [],
        }
    }

    componentDidMount() {

        // window.CS.getBMState().categories.
        Axios.get(`${process.env.REACT_APP_BACKEND}/category`)
            .then(res => {
                let categoryInfo = window.CS.getBMState().categories.filter((cat: ICategory) => cat.name === this.props.category)[0];
                this.setState({
                    categoryId: categoryInfo._id,
                    categoryDescription: categoryInfo.description,
                    pictureList: categoryInfo.pic_list.map((pic: string) =>
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

                    <Row type="flex" justify="center" className="searchCriteria">

                        <div>
                            <Search placeholder="Artikelsuche: Name hier eingeben" style={searchItemStyle} onSearch={value => console.log(value)} enterButton size="small"/>
                        </div>

                        <Select defaultValue="title" size="small" style={searchItemStyle} onChange={this.handleSort}>
                            <Option value="title">Sortiere nach Titel</Option>
                            <Option value="up">Sortiere nach Preis (auf)</Option>
                            <Option value="down">Sortiere nach Preis (ab)</Option>
                        </Select>
                    </Row>

                    <Row type="flex" justify="center">

                        {this.state.products.map((product: IProduct) => <PagedArticles key={product._id} product={product} />)}

                    </Row>
                </div>

            </div>
        )
    }

    handleSort(event: any) {

        switch (event) {
            case 'title': {
                let productList = Array.from(this.state.products).sort((a: IProduct, b: IProduct) => a.title.localeCompare(b.title));
                this.setState({ products: productList })
                break;
            }
            case 'up': {
                let productList = Array.from(this.state.products).sort((a: IProduct, b: IProduct) => a.price - b.price);
                this.setState({ products: productList })
                break;
            }
            case 'down': {
                let productList = Array.from(this.state.products).sort((a: IProduct, b: IProduct) => b.price - a.price);
                this.setState({ products: productList })
                break;
            }
        }
    }
}