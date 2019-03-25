import React, { Component } from "react";
import { Col, Row, Modal, Icon, Input, Button } from 'react-materialize'
import { connect } from 'react-redux';

import * as actions from '../actions';

class CurrencyModal extends Component {
  onTextChange = (e) => {
    console.log(e.target.value);
    const rate = Object.values(this.props.order)
    
    console.log(rate, 'rate');
    
    const orderValue = parseInt(e.target.value)
    const subtotal = orderValue / rate
    const commissionPCT = (subtotal * this.props.settings.commission) + this.props.settings.surcharge
    const commission = Math.max(commissionPCT, this.props.settings.minCommission)
    const total = (subtotal + commission)
    console.log(rate, 'RATE',orderValue,'ordervalue',subtotal,'subtotal',commissionPCT,'cpct',commission,'commission',total, 'total');
    
    //throw alert here for validation
    const payload = {
      orderValue: orderValue,
      orderSubtotal: subtotal,
      orderCommission: commission,
      orderTotal: total
    }
    console.log(payload,'payload');
    
    this.props.setValue(payload);
  }
  
  onOrderClick = () => {
    console.log(this.props.orderValue, this.total);
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
    // console.log(this.props, 'props');
    
    const valueNum = (this.props.orderProcess.orderValue === 0) ? '' : this.props.orderProcess.orderValue
    // debugger
    console.log(this.props.orderProcess.orderValue, 'this.props.orderProcess.orderValue');
    
    return (

      <Modal
      // className="center"
      header={`${Object.keys(this.props.order)} ${this.props.currency}`}
      trigger={<Col  s={2} className={`list-group-item`}>{Object.values(this.props.order)}</Col>}
      actions={
        <>
          <Button modal='close' onClick={this.onOrderClick}>{`${Object.keys(this.props.order)}`}</Button>
          <Button modal='close' onClick={this.onCancel}>cancel</Button>
        </>}
      >
      <form>
        <br></br>
            <Row s={12} className='center'>
              <Input 
                s={6} 
                className='center' 
                autoComplete="off" 
                label="Amount" 
                placeholder='enter amount'
                value={valueNum.toString()}
                onChange={this.onTextChange} 
                validate>
                <Icon>account_balance</Icon>
              </Input>
            </Row>

            <Row>
              <Col s={6}>{"Exchange Rate"}</Col>
              <Col s={6}>{Object.values(this.props.order)}</Col>
            </Row>
            <Row>
              <Col s={6}>{"Subtotal"}</Col>
              <Col s={6}>{ this.props.orderProcess.orderSubtotal.toFixed(2) }</Col>
            </Row>
            <Row>
              <Col s={6}>{"Commission"}</Col>
              <Col s={6}>{ this.props.orderProcess.orderCommission.toFixed(2) }</Col>
            </Row>
            <Row>
              <Col s={6}>{"Total"}</Col>
              <Col s={6}>{ this.props.orderProcess.orderTotal.toFixed(2) }</Col>
            </Row>
          </form>
      </Modal>
    )
  }

}

const mapStateToProps = ({bankData}) => {
  const {settings, balances, orderProcess} = bankData
  
  return {settings, balances, orderProcess}
}

export default connect(mapStateToProps, actions)(CurrencyModal)