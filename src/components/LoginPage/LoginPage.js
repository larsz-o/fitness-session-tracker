import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core'; 

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }
  resetPassword = () => {
    console.log('in reset password');
    this.props.history.push('/resetpassword'); 
  }
  render() {
    return (
      <div className="body-div flex-box">
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
          <div className="login-form">
            <label htmlFor="username">&nbsp;&nbsp;
              Username:
              <TextField
                type="text"
                name="username"
                autoComplete="off"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          
          <div>
            <label htmlFor="password">&nbsp;&nbsp;
              Password:
              <TextField
                type="password"
                name="password"
                autoComplete="off"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div className="button-margin">
            <Button variant="contained" color="primary" className="login-button" onClick={this.login}>Login</Button><br/><br/>
            <Button onClick={this.resetPassword}>Forgot Password?</Button>
          </div>
          </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user
});

export default connect(mapStateToProps)(LoginPage);
