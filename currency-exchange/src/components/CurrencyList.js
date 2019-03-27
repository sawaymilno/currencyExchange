import React, { Component } from "react";
import { Col, Row, Card } from 'react-materialize'
import { connect } from 'react-redux';

import * as actions from '../actions';
import quotes from '../apis/currencyLayer'
import Currency from './Currency'

class CurrencyList extends Component {
  //default timing placeholder until api call returns with current data.
  state = {
    datePrompt: `Exchange rates shown as per 0000/00/00 00:00:00.  `
  }

  //initial loading of data from api
  componentDidMount = async () =>  {
    try{
      const { data } = await quotes.get()
      const dataArr = Object.entries(data.quotes)
      this.props.fetchQuotes(dataArr)
    } catch(e) {
      console.log(e);
      this.apiCallFail()
    }
    
  }

  //refreshes date/time whenver api call is made
  componentDidUpdate(prevProps) {
    const quotes = this.props.quotes
    const prevQuotes = prevProps.quotes
    if (prevQuotes !== quotes) {
      this.refreshDate()
    }
  }
  apiCallFail = () => this.props.callFail()
  renderClock = (time) => (time < 10) ?`0${time}` :`${time}`

  refreshDate = () => {
    const today = new Date();
    const date = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()} ${this.renderClock(today.getHours())}:${this.renderClock(today.getMinutes())}:${this.renderClock(today.getSeconds())}`
    const datePrompt = `Exchange rates shown as per ${date}.  ` 
    this.setState({ datePrompt }) 
  }
    
  render() {

    const color = (this.props.balances.USD < this.props.initialBalances.USD * .25) ? 'red' : 'black'
    const moneyPrompt = `You have $${this.props.balances.USD.toFixed(2)} USD left.`
    const warning = (this.props.settings.quoteUpdateInterval === 0) ? 'Automatic Quote Refresh Is Disabled' : ''
    const datePrompt = this.state.datePrompt
    
    return (
      <>
      <Row className='center'>
      <div style={{color: 'red'}}>{this.props.failMessage}</div>
      <span>{datePrompt}</span><span style={{color}}>{moneyPrompt}</span>
        <div style={{color: 'red'}}>{warning}</div>
      </Row>
      <Card>
        <div  className='list-group-item col s12 center'>
        <Row className='bold'>
          <Col s={4}>Currency</Col>
          <Col s={2}>Buy</Col>
          <Col s={2}>Sell</Col>
          <Col s={4}>Amount Available</Col>
        </Row>
        {this.props.quotes.map((quote, i) => {
          return (<Currency balances={this.props.balances} quote={quote} key={i}/>)
        })}
      </div>
    </Card>
    </>
    )
  }
}
const mapStateToProps = ({ bankData }) => {
 return bankData
}
export default connect(mapStateToProps, actions)(CurrencyList);