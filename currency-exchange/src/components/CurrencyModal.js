import React, { Component } from "react";
import { Col, Row, Modal, Icon, Input, Button } from 'react-materialize'
import { connect } from 'react-redux';

import * as actions from '../actions';

class CurrencyModal extends Component {

  //local state to help with validations
  state = {
    sufficientForeign: true,
    sufficientDomestic: true,
    validEntry: true,
    minimumAmount: true
  }

  //sends input to and renders from currencyReducer also check for validations
  onTextChange = (e) => {

    //resets validations
    this.setState({sufficientForeign:true, sufficientDomestic: true, validEntry: true, minimumAmount: true})

    //variables needed for validation
    const currency = this.props.currency
    const foreignBalance = this.props.balances[currency]
    const domesticBalance = this.props.balances['USD']
    const order = Object.keys(this.props.order)[0]

    //variables needed calculations and sending payload to reducer
    let setOrderValue = parseInt(e.target.value)
    const setRate = Object.values(this.props.order)[0]
    let setSubtotal = setOrderValue * setRate
    const setCommissionPCT = (setSubtotal * this.props.settings.commission) + this.props.settings.surcharge
    let setCommission = Math.max(setCommissionPCT, this.props.settings.minCommission)
    let setTotal = order === 'Sell' ? (setSubtotal + setCommission) : (setSubtotal - setCommission)
    
    //checks to be a valid number
    if (isNaN(setOrderValue) || typeof setOrderValue !== 'number') {
      setOrderValue = 0
      setSubtotal = 0
      setCommission = 0
      setTotal = 0
      this.setState({validEntry: false})
    }

    //checks for valid quantities
    if (order === 'Sell' && setOrderValue > foreignBalance) {
      this.setState({sufficientForeign: false})
    } else if (order === 'Buy' && setTotal > domesticBalance) {
      this.setState({sufficientDomestic: false})
    } else if (order === 'Buy' && setOrderValue > 0 && setTotal < 1) {
      this.setState({minimumAmount: false})
    }

    const payload = {
      orderValue: setOrderValue,
      orderSubtotal: setSubtotal,
      orderCommission: setCommission,
      orderTotal: setTotal
    }

    this.props.setValue(payload);
  }
  
  //changes balances in currencyReducer
  onOrderClick = () => {

    const submitOrderTrade = Object.keys(this.props.order)[0]
    const submitOrderCurrency = this.props.currency
    const value = this.props.orderProcess.orderValue
    const submitOrderValue = parseFloat(value.toFixed(2))
    const total = this.props.orderProcess.orderTotal
    const submitOrderTotal = parseFloat(total.toFixed(2))
    let submitBalances = Object.assign({},this.props.balances)
    
    this.onClear();
    if (submitOrderTrade === 'Sell')  {
        submitBalances[`${submitOrderCurrency}`] -= submitOrderValue;
        submitBalances.USD += submitOrderTotal;
    } else {
        submitBalances[`${submitOrderCurrency}`] += submitOrderValue;
        submitBalances.USD -= submitOrderTotal;
      }

    this.props.makeOrder(submitBalances)
  }

  //resets local state as well as payloads to currencyReducer
  onClear = () => {
    const payload = {
      orderValue: 0,
      orderSubtotal: 0,
      orderCommission: 0,
      orderTotal: 0
    }
    this.setState({sufficientForeign: true,
      sufficientDomestic: true,
      validEntry: true,
      minimumAmount: true
    })
    this.props.setValue(payload)
  }
  
  render() {
    
    const orderType = `${Object.keys(this.props.order)}`
    const currency = this.props.currency.slice(3)
    const rate = Object.values(this.props.order)
    const inputValue = (this.props.orderProcess.orderValue === 0) ? '' : this.props.orderProcess.orderValue
    const subTotal = this.props.orderProcess.orderSubtotal.toFixed(2)
    const commission = this.props.orderProcess.orderCommission.toFixed(2)
    const trade = (Object.keys(this.props.order)[0]) === 'Sell' ? 'Receive' : 'Deliver'
    const total = (this.props.orderProcess.orderTotal.toFixed(2) < 0) ? 0 : this.props.orderProcess.orderTotal.toFixed(2)
    const lackOfFunds = (this.state.sufficientForeign) ? '' : `You do not have enough ${currency} to cover this transaction!`
    const lackOfDollars = (this.state.sufficientDomestic) ? '' : `You do not have enough USD to cover this transaction!`
    const invalidEntry = (this.state.validEntry) ? '' : `Please a enter valid amount`

    let disabled = (this.state.validEntry === false || this.state.sufficientDomestic === false || this.state.sufficientForeign === false || this.state.minimumAmount === false) ? true : false
    const minimumAmount = (this.state.minimumAmount) ? '' : 'Please Purchase A Minimum Amount'

    return (
      <Modal
      header={`${orderType} ${currency}`}
      trigger={<Col  s={2} className={`list-group-item`}>{rate}</Col>}
      actions={
        <>
          <Button 
            style={{backgroundColor: 'blue'}} 
            modal='close'
            onClick={this.onOrderClick}
            disabled={disabled}
            >
            {orderType} 
          </Button>
          <Button 
            style={{backgroundColor: 'blue'}} 
            modal='close' 
            onClick={this.onClear}>
            cancel
          </Button>
        </>}
      >
        <form>
          <br></br>
          <Row s={12} className='center'>
            <Input 
              s={6} 
              label='Amount' 
              className='center' 
              autoComplete='off' 
              placeholder='enter amount'
              value={`${inputValue}`}
              onChange={this.onTextChange} 
              validate>
              <Icon>account_balance</Icon>
            </Input>
            <Col style={{color: 'red'}}>{lackOfFunds}{lackOfDollars}{invalidEntry}{minimumAmount}</Col>
          </Row>

          <Row>
            <Col s={6}>{'Exchange Rate:'}</Col>
            <Col s={6}>{`$${rate}`}</Col>
          </Row>
          <Row>
            <Col s={6}>{'Subtotal:'}</Col>
            <Col s={6}>{`$${subTotal}`}</Col>
          </Row>
          <Row>
            <Col s={6}>{'Commission:'}</Col>
            <Col s={6}>{`$${commission}`}</Col>
          </Row>
          <Row>
            <Col s={6}>{`ACEO To ${trade}:`}</Col>
            <Col s={6}>{`$${total}`}</Col>
          </Row>
        </form>
      </Modal>
    )
  }

}

const mapStateToProps = ({ bankData }) => {
  const { settings, balances, orderProcess } = bankData
  return { settings, balances, orderProcess }
}

export default connect(mapStateToProps, actions)(CurrencyModal)