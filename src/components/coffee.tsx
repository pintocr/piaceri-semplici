import React from 'react';
import Axios from 'axios';
import '../stylesheets/coffee.scss';

interface ICategory {
    _id: String;
    name: String;
    description: String;
    pic_list: String[];
}

interface IState {
    categoryId: String;
    categoryDescription: String;
    pictureList: string[];
}
interface IProps { }

export default class Coffee extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            categoryId: '',
            categoryDescription: '',
            pictureList: []
        }
    }

    componentDidMount() {

        Axios.get(`${process.env.REACT_APP_BACKEND}/category`)
            .then(res => {
                let categoryInfo = res.data.filter((cat: ICategory) => cat.name === 'Coffee')[0];
                this.setState({
                    categoryId: categoryInfo._id,
                    categoryDescription: categoryInfo.description,
                    pictureList: categoryInfo.pic_list.map((pic: String) =>
                        process.env.REACT_APP_BACKEND + '/images/' + pic)
                });
                console.log(this.state)
            });
    }


    render() {

        return (
            <div>

                <div className="image-wrapper">
                    <div className="description">{this.state.categoryDescription}</div>
                    <div className="images image1"><img src={this.state.pictureList[0]} alt="pic" /></div>
                    <div className="images image2"><img src={this.state.pictureList[1]} alt="pic" /></div>
                    <div className="images image3"><img src={this.state.pictureList[2]} alt="pic" /></div>
                    <div className="images image4"><img src={this.state.pictureList[3]} alt="pic" /></div>
                </div>

            </div>
        )
    }

}