import React from 'react';
import { Input } from "antd";
import "antd/dist/antd.css";
import StartPageArticles from './component/startPageArticles';
const { Search } = Input;


interface IProps { 
 
}

interface IState {}

export default class App extends React.PureComponent<IProps, IState> {

  render() {
    return (
      <div>
         <div className="App">
          <div className = "Searchbox">
            <p>Artikelsuche</p>
            <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton /></div>
            <div>
              <table>
                <tr>
                  <th>Product</th><th>Description</th><th>Price</th>
                </tr>
                <StartPageArticles/>
              </table>
              
            </div>
          </div>
      </div>
     
    );
  }
}