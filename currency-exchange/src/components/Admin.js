import React, { Component } from "react";
import { Col, Row, Input, Button } from 'react-materialize'
import { connect } from 'react-redux';
import * as actions from '../actions';

class Admin extends Component {
  //decided to build 5 separate functions to allow for efficiency of updating changes. 
  //I could have built one function and delivered an object to replace all settings upon each change.
  onCommissionChange = (e) => this.props.editCommission((e.target.value/100));
  onSurchargeChange = (e) => this.props.editSurcharge(parseInt(e.target.value));
  onIntervalChange = (e) => this.props.editInterval(parseInt(e.target.value));
  onMinComChange = (e) => this.props.editMinCom(parseInt(e.target.value));
  onMarginChange = (e) => this.props.editMargin((e.target.value/100));
  
  render() {
    //values needed to be formatted both in length and as a string for React purposes and UI
    const commissionValue = (this.props.commission * 100).toFixed(2)
    const surchargeValue = this.props.surcharge.toFixed(2)
    const quoteUpdateValue = this.props.quoteUpdateInterval
    const minCommissionValue = this.props.minCommission.toFixed(2)
    const rateMarginValue = (this.props.buySellMargin * 100).toFixed(2)
    
    return (
      <>
        <br></br>
        <Row s={12} className='center'>
          <Col s={2}></Col>
            <Col s={3}> 

              <Input 
                s={10} 
                label='Commission %' 
                type='number'
                min='0'
                max='100'
                className='center' 
                autoComplete='off' 
                defaultValue={null}
                value={`${commissionValue}`}
                onChange={this.onCommissionChange} 
                validate
                >
              </Input>

            </Col>
            <Col s={3}></Col>
            <Col s={3}> 

              <Input 
                s={10} 
                label='Surcharge $' 
                type='number'
                min='0'
                max='1000'
                className='center' 
                autoComplete='off'
                value={`${surchargeValue}`}
                onChange={this.onSurchargeChange} 
                validate>
              </Input>

            </Col>
          </Row>

          <Row className='center'>
          <Col s={5}></Col>

            <Input 
              s={2} 
              label='Quote Update Interval (minutes)' 
              type='number'
              min='0'
              max='20'
              className='center' 
              autoComplete='off'
              value={`${quoteUpdateValue}`}
              onChange={this.onIntervalChange} 
              validate>
            </Input>

          </Row>

          <Row s={12} className='center'>
          <Col s={2}></Col>
            <Col s={3}> 

              <Input 
                s={10} 
                label='Minimal Commission $' 
                type='number'
                min='0'
                max='1000'
                className='center' 
                autoComplete='off' 
                value={`${minCommissionValue}`}
                onChange={this.onMinComChange} 
                validate>
              </Input>

            </Col>
            <Col s={3}></Col>
            <Col s={3}> 

              <Input 
                s={10} 
                label='Buy/Sell Rate Margin %' 
                type='number'
                min='0'
                max='100'
                className='center' 
                autoComplete='off' 
                value={`${rateMarginValue}`}
                onChange={this.onMarginChange} 
                validate>
              </Input>

            </Col>

        </Row>
        <Col className='center'>
          <Button style={{backgroundColor: 'blue'}} onClick={() => this.props.history.push('/')}>
            Update 
          </Button>
        </Col>
      </>
    )
  }
}

const mapStateToProps = ({ bankData }) => {
  return bankData.settings
 }
 export default connect(mapStateToProps, actions)(Admin);