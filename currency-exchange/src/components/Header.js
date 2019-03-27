import React from 'react';
import {Navbar, NavItem, Icon } from 'react-materialize';
import history from '../history';

const Header = () => {

  const companyLogo = <div className='col 12' style={{ marginLeft: 50, color: 'white'}}>A C E O</div>;

  return (
    <Navbar className='blue accent-4'  brand={ companyLogo } href={() => ''} right>
      <NavItem onClick={() => history.push('/')}>
            Home
      </NavItem>
      <NavItem onClick={() => history.push('/admin')}>
          Admin 
      </NavItem>
      <NavItem onClick={() => ''}>
        <Icon large className='white-text'>attach_money</Icon>
      </NavItem>
    </Navbar> 
    )
};


export default Header;
