import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let paragraph = "Welcome to React App Development";
let name ="Ryan";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>{ paragraph } { name }</h1>
      </div>
    );
  }
}

export default App;
