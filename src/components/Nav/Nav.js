import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="padding-left">
    <div className="nav">
    <Link to="/dashboard">
    <img src={require('../../images/larger-logo-test.jpg')} alt="fitness meets wellness logo"/>
    </Link>
    </div>
      <Link className="nav-link" to="/dashboard">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? 'Home' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      {props.user.id && (
        <>
          <Link className="nav-link" to="/clients">
            Manage Clients
          </Link>
          <LogOutButton className="nav-link"/>
        </>
      )}
      </div>
    
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
