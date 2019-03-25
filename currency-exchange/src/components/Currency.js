import React from "react";
import { Col, Row } from 'react-materialize'
import { connect } from 'react-redux';

import * as actions from '../actions';
import CurrencyModal from './CurrencyModal'

const Currency = (props) => {
  
  const {quote} = props
  
  const currency = quote[0]
  const b = 1/(quote[1] * (1 + props.settings.buySellMargin))
  const s = 1/(quote[1] * (1 - props.settings.buySellMargin))
  const Buy = b.toFixed(4)
  const Sell = s.toFixed(4)
  const initVal = props.balances[`${quote[0]}`]
  
  console.log(props.balances, 'in currency', initVal, 'initVal');

  return (
    <Row className='bold'>
      <Col s={4}>{ currency.slice(3) }</Col>
      <CurrencyModal order={{Buy}} currency={currency} s={2}>{ Buy }</CurrencyModal>
      <CurrencyModal order={{Sell}} currency={currency} s={2}>{ Sell }</CurrencyModal>
      <Col s={4}>{initVal.toFixed(2)}</Col>
    </Row>
  )

}

const mapStateToProps = ({bankData}) => {
  const {settings, balances} = bankData
  return {settings, balances}
}

export default connect(mapStateToProps, actions)(Currency)