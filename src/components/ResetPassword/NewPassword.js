import React, {Component} from 'react'; 
import {Input, Button, Typography, FormLabel} from '@material-ui/core'; 
import axios from 'axios';

class NewPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email_address: '',
            password: '',
            confirm_password: '', 
            today: '', 
            token: this.props.match.params.token
        };
    }
    handleChange = (property, event) => {
        const today = new Date(); 
        this.setState({
            [property]: event.target.value, 
            today: today
        });
       
    }
    handleSubmit = () => {
        if(this.state.password === this.state.confirm_password){
            axios({
                method: 'PUT',
                url: '/api/user/resetpassword',
                data: this.state
            }).then((response) => {
                alert('Update successful! Please login with your new password.');
                //send an email with nodemailer that includes the token 
                this.props.history.push('/home'); 
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong');
            });
        } else {
            alert('Passwords do not match! Please try again.');
        }
       
    }
    render(){
        return(
        <div className="center">
        <div className="reset-form">
        <h2>Create New Password</h2>
            <FormLabel>Email address:
                <Input onChange={(event)=>this.handleChange('email_address', event)} /><br/>
            </FormLabel>
            <FormLabel>New password:
                <Input type="password" onChange={(event)=>this.handleChange('password', event)} /><br/>
            </FormLabel>
            <FormLabel>Confirm password:
                <Input type="password" onChange={(event)=>this.handleChange('confirm_password', event)} /><br/>
            </FormLabel>
        </div>
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
                <Button onClick={()=>this.props.history.push('/home')}>Cancel</Button>
            </div>
        );
    }
}
export default NewPassword; 