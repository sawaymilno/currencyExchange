import React, { Component } from 'react';
// import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header'
import CurrencyList from './CurrencyList'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <CurrencyList />
      </div>
    );
  }
}

export default App;
