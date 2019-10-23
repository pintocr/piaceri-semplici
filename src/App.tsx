import React from 'react';
import { Input } from 'antd';
const { Search } = Input;

interface IProps { }

interface IState {}

export default class App extends React.PureComponent<IProps, IState> {

  render() {
    return (
      <div>
         <div className="App">
          <div className = "Searchbox">
            <p>Artikelsuche</p>
            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton /></div>
          </div>
      </div>
     
    );
  }
}