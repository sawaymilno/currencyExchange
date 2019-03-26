import React, { Component } from "react";
import { Col, Row, Modal, Icon, Input, Button } from 'react-materialize'
import { connect } from 'react-redux';

import * as actions from '../actions';

class CurrencyModal extends Component {

  onTextChange = (e) => {

    //throw alert here for validation
    const setOrderValue = parseInt(e.target.value)
    const setRate = Object.values(this.props.order)
    const setSubtotal = setOrderValue * setRate
    const setCommissionPCT = (setSubtotal * this.props.settings.commission) + this.props.settings.surcharge
    const setCommission = Math.max(setCommissionPCT, this.props.settings.minCommission)
    const setTotal = (Object.keys(this.props.order)[0]) === 'Sell' ? (setSubtotal + setCommission) : (setSubtotal - setCommission)
    const payload = {
      orderValue: setOrderValue,
      orderSubtotal: setSubtotal,
      orderCommission: setCommission,
      orderTotal: setTotal
    }

    this.props.setValue(payload);
  }
  
  onOrderClick = () => {
    const submitOrderTrade = Object.keys(this.props.order)[0]
    const SubmitOrderCurrency = this.props.currency
    const submitOrderValue = this.props.orderProcess.orderValue
    const submitOrderTotal = this.props.orderProcess.orderTotal
    let submitBalances = Object.assign({},this.props.balances)
    
    const initVal = {
      orderValue: 0,
      orderSubtotal: 0,
      orderCommission: 0,
      orderTotal: 0
    }
    this.props.setValue(initVal)

    if (submitOrderTrade === 'Sell')  {
      submitBalances[`${SubmitOrderCurrency}`] -= submitOrderValue;
      submitBalances.USD += submitOrderTotal
    } else {
      submitBalances[`${SubmitOrderCurrency}`] += submitOrderValue;
      submitBalances.USD -= submitOrderTotal
    }
    this.props.makeOrder(submitBalances)
  }

  onCancel = () => {
    const payload = {
      orderValue: 0,
      orderSubtotal: 0,
      orderCommission: 0,
      orderTotal: 0
    }

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
    
    return (
      <Modal
      header={`${orderType} ${currency}`}
      trigger={<Col  s={2} className={`list-group-item`}>{rate}</Col>}
      actions={
        <>
          <Button style={{backgroundColor: 'blue'}} modal='close' onClick={this.onOrderClick}>{orderType}</Button>
          <Button style={{backgroundColor: 'blue'}} modal='close' onClick={this.onCancel}>cancel</Button>
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