import React from 'react';
import './App.css';
import NavBar from './components/NavBar'

interface IProps { }

interface IState {}

export default class App extends React.PureComponent<IProps, IState> {

  render() {
    return (    
      <div>
        <NavBar/>
      </div>
     
    );
  }
}