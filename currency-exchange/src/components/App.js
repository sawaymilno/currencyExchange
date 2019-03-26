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

  // constructor(props) {
  //   super(props) 
  //     this.getQuotes = setInterval(() => console.log('setInterval', typeof this.props.settings.quoteUpdateInterval), this.props.settings.quoteUpdateInterval * 1000)
    
  // }
  state = {
    getQuotes: setInterval(() => console.log('setInterval', typeof this.props.settings.quoteUpdateInterval), this.props.settings.quoteUpdateInterval * 1000)
  }

  // componentDidMount() {
  //   console.log(this.props.settings.quoteUpdateInterval)
  //   if (this.props.settings.quoteUpdateInterval !== 0) {
  //     console.log('running')
  //     this.state.interval1()
  //     // setInterval(() => this.loadData(), this.props.settings.quoteUpdateInterval * 6000);
  //     // let interval1 = setInterval(() => console.log('setInterval', typeof this.props.settings.quoteUpdateInterval), this.props.settings.quoteUpdateInterval * 1000)

  //   }
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.quoteUpdateInterval !== this.props.settings.quoteUpdateInterval) {
      console.log('here');
      
        // if (this.getquotes !== null) {
        //   console.log(this, 'in if');
          
        //   clearInterval(this.getquotes)
        //   this.getQuotes = setInterval(() => console.log('setInterval', typeof this.props.settings.quoteUpdateInterval), this.props.settings.quoteUpdateInterval * 1000)
        // }
      if (this.state.getQuotes !== null) {
          clearInterval(this.state.getQuotes)
          if (this.props.settings.quoteUpdateInterval === 0) {
            this.setState({ getQuotes: 0 })
          } else {
            this.setState({
              getQuotes: setInterval(() => console.log('setInterval', typeof this.props.settings.quoteUpdateInterval), this.props.settings.quoteUpdateInterval * 1000)
            })
          }
        }
        // console.log(this.props.settings.quoteUpdateInterval)
        // if (prevProps.settings.quoteUpdateInterval === 0) {
        //     this.setState({
        //         interval1: setInterval(() => console.log('setInterval', typeof this.props.settings.quoteUpdateInterval), this.props.settings.quoteUpdateInterval * 1000)
        //       })
        //     } 
    }
  }

  // updateTimer = () => {

  //   const interval = setInterval(() => console.log('setInterval', typeof this.props.settings.quoteUpdateInterval), this.props.settings.quoteUpdateInterval * 1000)
  //   clearInterval(interval)
  //   interval()
  // }

  loadData = async () =>  {
    const { data } = await quotes.get()
    const dataArr = Object.entries(data.quotes)
    this.props.fetchQuotes(dataArr)
  }

  render() {
    // this.intervalCall()
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

