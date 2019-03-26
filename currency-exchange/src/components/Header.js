import React from 'react';
import {Navbar, NavItem, Icon } from 'react-materialize';
import history from '../history';
// import { Link } from 'react-router-dom';

const Header = () => {

  const companyLogo = <div className='col 12' style={{ marginLeft: 50, color: 'white'}}>A C E O</div>;

  return (
    <Navbar className='blue accent-4'  brand={ companyLogo } right>
      <NavItem onClick={() => history.push('/')}>
        {/* <Link to={`/`} style={{color: 'white'}}> */}
            Home
        {/* </Link> */}
      </NavItem>
      <NavItem onClick={() => history.push('/admin')}>
        {/* // <Link to={`/admin`} style={{color: 'white'}}> */}
          Admin 
        {/* // </Link> */}
      </NavItem>
      <NavItem>
        <Icon large className='white-text'>attach_money</Icon>
      </NavItem>
    </Navbar> 
    )
};


export default Header;
