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
  //initializes get request to API based on a set interval that is adjustable via admin page.
  state = { 
    getQuotes: setInterval(() => this.loadData(), this.props.settings.quoteUpdateInterval * 6000),
    access: false
  }

  //when admin updates timing of refresh
  componentDidUpdate(prevProps) {
    const update = this.props.settings.quoteUpdateInterval
    if (prevProps.settings.quoteUpdateInterval !== update) {
      clearInterval(this.state.getQuotes);
      (update === 0) ? this.setState({ getQuotes: 0 }) : this.setState({getQuotes: setInterval(() => this.loadData(), update * 6000)});
    }
  }

  //get request to  api
  //will see if update is different than existing data. Will introduce "stochastic" if necessary.
  loadData = async () =>  {
    console.log('database called');
    try {
      const { data } = await quotes.get()
      let dataArr = Object.entries(data.quotes)
      console.log(dataArr, this.props.quotes);
      
      if (this.compare(dataArr,this.props.quotes)) { 
        dataArr = dataArr.map(quote => [quote[0],quote[1] * (103 - (Math.random() * 6))/100]) 
      }
      this.props.fetchQuotes(dataArr)
    } catch(e) {
      console.log(e)
    }
  }

  
  compare = (arr1,arr2) => {   
    let result
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i][1] !== arr2[i][1]) {
        result = false
        break
      } else {
        result = true
      }
    }
    console.log(result)
    return result
  }

 //simple password access
  onPasswordChange = (e) => {
    if (e.target.value === 'helloWorld') {
      this.setState({access: true})
    }
    this.props.editPassword((e.target.value))
  }


  render() {
    // return !this.state.access ? (<div><input onChange={this.onPasswordChange} placeholder='enter password'  value={`${this.props.password}`}></input></div>) : (
      return (<div className='App'>
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

