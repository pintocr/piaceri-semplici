import React from 'react';
import './App.css';
import { Input } from 'antd';
import NavBar from './components/NavBar'
const { Search } = Input;

interface IProps { }

interface IState {}

export default class App extends React.PureComponent<IProps, IState> {

  render() {
    return (    
      <div>
        <NavBar/>
         <div className="App">
          <div className = "Searchcontainer">
            <div className = "Searchbox">
            <h2>Artikelsuche </h2>
            <Search placeholder="Artikelname hier eingeben" onSearch={value => console.log(value)} enterButton /></div>
            </div>
          </div>
      </div>
     
    );
  }
}