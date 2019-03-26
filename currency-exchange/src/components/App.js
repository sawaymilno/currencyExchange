import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header'
import CurrencyList from './CurrencyList';
import Admin from './Admin';
import history from '../history';
import * as actions from '../actions';
import quotes from '../apis/currencyLayer'

class App extends Component {

  componentDidMount = () => setInterval(() => this.loadData(), this.props.settings.quoteUpdateInterval * 60000);
  
  loadData = async () =>  {
    const { data } = await quotes.get()
    const dataArr = Object.entries(data.quotes)
    this.props.fetchQuotes(dataArr)
  }

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

const mapStateToProps = ({ bankData }) => {
  return bankData
 }
 export default connect(mapStateToProps, actions)(App);

