import React, { Component } from "react";
import { Col, Row, Input, Icon } from 'react-materialize'
import { connect } from 'react-redux';


import * as actions from '../actions';

class Admin extends Component {


  render() {
    return (
      <>
      <form>
        <Row>
          
        </Row>
          <br></br>
          <Row s={12} className='center'>
          <Col s={1}></Col>
            <Col s={3}> 
              <Input 
                s={10} 
                type='number'
                id='Commission'
                name='Commission'
                min='10'
                max='100'
                className='center' 
                autoComplete='off' 
                label='Commission' 
                placeholder='enter amount'
                // value={valueNum.toString()}
                onChange={this.onTextChange} 
                validate>
              </Input>
            </Col>
            <Col s={3}></Col>
            <Col s={3}> 
              <Input 
                s={10} 
                type='number'
                id='Surcharge'
                name='Surcharge'
                min='10'
                max='100'
                className='center' 
                autoComplete='off' 
                label='Surcharge' 
                placeholder='enter amount'
                // value={valueNum.toString()}
                onChange={this.onTextChange} 
                validate>
              </Input>
            </Col>
          </Row>

          <Row s={12} className='center'>
          <Col s={1}></Col>
            <Col s={3}> 
              <Input 
                s={10} 
                type='number'
                id='Minimal Commission'
                name='Minimal Commission'
                min='10'
                max='100'
                className='center' 
                autoComplete='off' 
                label='Minimal Commission' 
                placeholder='enter amount'
                // value={valueNum.toString()}
                onChange={this.onTextChange} 
                validate>
              </Input>
            </Col>
            <Col s={3}></Col>
            <Col s={3}> 
              <Input 
                s={10} 
                type='number'
                id='Buy/Sell Rate Margin'
                name='Buy/Sell Rate Margin'
                min='10'
                max='100'
                className='center' 
                autoComplete='off' 
                label='Buy/Sell Rate Margin' 
                placeholder='enter amount'
                // value={valueNum.toString()}
                onChange={this.onTextChange} 
                validate>
              </Input>
            </Col>
          </Row>
        </form>
      </>
    )
  }
}

const mapStateToProps = ({ bankData }) => {
  return bankData.settings
 }
 export default connect(mapStateToProps, actions)(Admin);