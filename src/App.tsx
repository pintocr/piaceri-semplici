import React from 'react';
import { Input } from "antd";
import "antd/dist/antd.css";
const { Search } = Input;

interface IProps { }

interface IState {}

export default class App extends React.PureComponent<IProps, IState> {

  render() {
    return (
      <div>
         <div className="App">
          <div className = "Searchbox">
            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton /></div>
          </div>
      </div>
     
    );
  }
}