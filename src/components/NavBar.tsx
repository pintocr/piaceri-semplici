import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import "antd/dist/antd.css";
import { Icon } from 'antd';
import LoginContainerModal from './LoginContainer'
import '../index.css';
import Coffee from './categoryPage';
import DetailPage from './DetailPage';
import { Input } from 'antd';

const { Search } = Input;


interface IProps {
}

interface IState {
}




export default class NavBar extends React.PureComponent<IProps, IState> {


    render () {
        return (
            <Router>
            <div className="navBar">
            <Link className ="navigationEntry" to="/">Home</Link>&nbsp;
            <Link className ="navigationEntry" to="/coffee">Coffee</Link>&nbsp;
            <Link className ="navigationEntry" to="/whiskey">Whiskey</Link>&nbsp;
            <Link className ="navigationEntry" to="/chocolate">Chocolate</Link>&nbsp;
            <LoginContainerModal/>&nbsp;
            <Link className ="navigationEntry" to="/"><Icon type="shopping-cart" style={{ fontSize: '24px' }}/></Link>&nbsp;
            </div>
            <div className = "Searchcontainer">
            <div className = "Searchbox">
            <h2>Artikelsuche </h2>
            <Search placeholder="Artikelname hier eingeben" onSearch={value => console.log(value)} enterButton />
            </div>
          </div>
            <br />
            <Route path="/coffee"><Coffee category="Coffee"/></Route>
            <Route path="/whiskey"><Coffee category="Whiskey" /></Route>
            <Route path="/chocolate"><Coffee category="Chocolate" /></Route>
            <Route path="/detailpage/:id" render={(props) => <DetailPage {...props} />}/>    
            </Router>
        ) 
    }

}


