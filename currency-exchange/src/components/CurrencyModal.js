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
    const orderTrade = Object.keys(this.props.order)[0]
    const orderCurrency = this.props.currency
    const orderValue = this.props.orderProcess.orderValue
    const orderTotal = this.props.orderProcess.orderTotal
    let balances = Object.assign({},this.props.balances)
    
    const initVal = {
      orderValue: 0,
      orderSubtotal: 0,
      orderCommission: 0,
      orderTotal: 0
    }
    this.props.setValue(initVal)

    if (orderTrade === 'Sell')  {
      balances[`${orderCurrency}`] -= orderValue;
      balances.USD += orderTotal
    } else {
      balances[`${orderCurrency}`] += orderValue;
      balances.USD -= orderTotal
    }
    this.props.makeOrder(balances)
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
    const valueNum = (this.props.orderProcess.orderValue === 0) ? '' : this.props.orderProcess.orderValue
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
          <Button modal='close' onClick={this.onOrderClick}>{orderType}</Button>
          <Button modal='close' onClick={this.onCancel}>cancel</Button>
        </>}
      >
        <form>
          <br></br>
          <Row s={12} className='center'>
            <Input 
              s={6} 
              className='center' 
              autoComplete='off' 
              label='Amount' 
              placeholder='enter amount'
              value={valueNum.toString()}
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