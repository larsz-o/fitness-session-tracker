import React, { Component } from 'react'; 
import { Button, TextField, FormLabel } from '@material-ui/core';
import moment from 'moment'; 
import axios from 'axios'; 

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        // User will input e-mail
        this.state = { email: '' };
    }
    handleChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleSubmit = () => {
        let today = Date.now();
        today = moment(today).format();
        axios({
            method: 'PUT',
            url: '/api/user/createtoken',
            data: {email: this.state.email, today: today}
        }).then((response) => {
            alert('Please check your e-mail (including your spam folder) for a link to reset your password.');
            //send an email with nodemailer that includes the token 
            this.props.history.push('/home'); 
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong');
        });
    }
    render(){
        return(
            <div className="center">
            <div className="reset-form">
                <h2>Reset Password</h2>
                <FormLabel>Enter the email address associated with this account.</FormLabel>
                    <TextField id="email-input" onChange={this.handleChange}/>
            </div>
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                <Button onClick={()=>this.props.history.push('/home')}>Cancel</Button>
        </div>
        );
    }
}
export default ResetPassword; 