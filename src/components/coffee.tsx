import React from 'react';
import Axios from 'axios';
import '../stylesheets/coffee.scss';

const img1: string = process.env.REACT_APP_BACKEND + '/images/coffee1.jpg';
const img2: string = process.env.REACT_APP_BACKEND + '/images/coffee2.jpg';
const img3: string = process.env.REACT_APP_BACKEND + '/images/coffee3.jpg';
const img4: string = process.env.REACT_APP_BACKEND + '/images/coffee4.jpg';

interface ICategory {
    _id: String;
    name: String;
    description: String;
    pic_list: String[];
}

interface IState {
    categoryId: String;
    categoryDescription: String;
 }
interface IProps { }

export default class Coffee extends React.PureComponent<IProps, IState> {

    //  constructor(props: IProps) {
    //      super(props);

    //  }

    componentDidMount() {

        Axios.get(`${process.env.REACT_APP_BACKEND}/category`)
            .then(res => {
                console.log(res.data.filter((cat: ICategory) => cat.name === 'Coffee'))

            });
    }


    render() {

        return (
            <div>

                <div className="image-wrapper">
                    <div className="images image1"><img src={img1} alt="pic"/></div>
                    <div className="images image2"><img src={img2} alt="pic"/></div>
                    <div className="images image3"><img src={img3} alt="pic"/></div>
                    <div className="images image4"><img src={img4} alt="pic"/></div>
                </div>
                
            </div>
        )
    }

}