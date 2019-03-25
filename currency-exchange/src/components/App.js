import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header'
import CurrencyList from './CurrencyList';
import Admin from './Admin';
import history from '../history';

class App extends Component {
  render() {
    return (
      <div className='App'>
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={CurrencyList} />
            <Route path="/admin" exact component={Admin} />
          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
