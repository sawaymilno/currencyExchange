import React from 'react';
import {Navbar, NavItem, Icon } from 'react-materialize';
// import { Link } from 'react-router-dom';

const Header = () => {

  const companyLogo = <div className='col 12' style={{ marginLeft: 50, color: 'white'}}>A C E O</div>;

  return (
    <Navbar className='blue accent-4'  brand={ companyLogo } right>
      <NavItem>
        <div style={{color: 'white'}}>
            Home
        </div>
      </NavItem>
      <NavItem>
        <div style={{color: 'white'}}>
          Admin 
        </div>
      </NavItem>
      <NavItem>
        <Icon large className='white-text'>attach_money</Icon>
      </NavItem>
    </Navbar> 
    )
};


export default Header;
