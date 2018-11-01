import React, { Component } from 'react';
import  {IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, TextField } from '@material-ui/core';
import { MailOutline } from '@material-ui/icons'; 
import axios from 'axios'; 

class Email extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false, 
            subject: 'Personal Training Session Renewal Reminder', 
            message: `Hi ${this.props.clientToView.first_name}! 
        I hope you have enjoyed our personal training sessions. I'm writing to let you know that you just finished ${this.props.session.length} of your 10 prepaid sessions. Nice work! 
        If you'd like to sign up for more, you can do so by visiting http://www.fitnessmeetswellness.com or by calling me at (508) 366-8700. 
        Thanks for being a great client! 

From, 
Sue Mackenzie
Fitness Meets Wellness`
        }
    }
    emailReminder = () => {
        this.setState({
            open: false
        })
        axios({
            method: 'POST', 
            url: '/api/email',
            data: {subject: this.state.subject, message: this.state.message, recipient: this.props.clientToView.email_address}
        }).then((response) => {
            alert(`Reminder sent to ${this.props.clientToView.first_name} ${this.props.clientToView.last_name}!`)
        }).catch((error) => {
            console.log('Error sending reminder. Please try again', error); 
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleChangeFor = (event, property) => {
        this.setState({
            [property]: event.target.value
        })
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    render(){
        return(
            <div>
                <IconButton variant="contained" color="secondary" onClick={this.handleOpen}><MailOutline/>Email</IconButton>
                       <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={true}>
                       <DialogTitle>Send Reminder </DialogTitle>
                       <DialogContent>
                           <DialogContentText>To: {this.props.clientToView.first_name} {this.props.clientToView.last_name}</DialogContentText>
                           <DialogContentText>Subject: <TextField value={this.state.subject} onChange={(event)=>this.handleChangeFor(event, 'subject')} fullWidth={true}/></DialogContentText>
                           <DialogContentText>Message: <TextField value={this.state.message} onChange={(event)=>this.handleChangeFor(event, 'message')} fullWidth={true} multiline={true}/></DialogContentText>
                           <DialogActions>
                                <Button onClick={this.handleClose}>Cancel</Button>
                               <Button onClick={this.emailReminder} variant="contained" color="primary">Send</Button>
                           </DialogActions>
                       </DialogContent>
                        </Dialog>
            </div>
        );
    }
}
export default Email; 