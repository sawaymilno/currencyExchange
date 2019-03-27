import React, { Component } from "react";
import { Col, Row, Card } from 'react-materialize'
import { connect } from 'react-redux';

import * as actions from '../actions';
import quotes from '../apis/currencyLayer'
import Currency from './Currency'

class CurrencyList extends Component {

  componentDidMount = async () =>  {
    const { data } = await quotes.get()
    const dataArr = Object.entries(data.quotes)
    this.props.fetchQuotes(dataArr)
  }
  renderClock = (time) => (time < 10) ?`0${time}` :`${time}`
    
  render() {
    //  console.log(this.props.initialBalances.USD)
    const color = (this.props.balances.USD < this.props.initialBalances.USD * .25) ? 'red' : 'black'
    const today = new Date();
    const date = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()} ${this.renderClock(today.getHours())}:${this.renderClock(today.getMinutes())}:${this.renderClock(today.getSeconds())}`
    const datePrompt = `Exchange rates shown as per ${date}.  ` 
    const moneyPrompt = `You have $${this.props.balances.USD.toFixed(2)} USD left.`
    return (
      <>
      <Row className='center'>
        {datePrompt}<div style={{color}}>{moneyPrompt}</div>
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