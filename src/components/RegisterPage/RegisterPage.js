import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, TextField } from '@material-ui/core'; 

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    email: ''
  };

  registerUser = (event) => {
    event.preventDefault();
    console.log('registering user');
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        },
      });
      this.setState({
        username: '', 
        password: '', 
        email: ''
      });
      alert('Proceed to login')
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className="body-div white">
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <div className="flex-box">
        <form onSubmit={this.registerUser}>
          <h1>Register</h1>
          <div>
            <label htmlFor="username">
              Username:
              <TextField
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <TextField
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email_address">
              Email Address:
              <TextField
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
              />
            </label>
          </div>
          <div>
            <Button
              // className="register"
              type="submit"
              name="submit"
              variant="contained"
            >Register</Button>
          </div>
          <br/>
          <a className="nav-link" href="/#/dashboard">Already registered? Login</a>
        </form>
        </div>
          {/* <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button> */}
        
       
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

