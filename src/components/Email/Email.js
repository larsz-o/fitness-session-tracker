import React, { Component } from 'react';
import  {IconButton, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, TextField } from '@material-ui/core';
import { MailOutline } from '@material-ui/icons'; 
import axios from 'axios'; 
import { connect } from 'react-redux'; 

class Email extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false, 
            subject: 'Fitness Meets Wellness Session Renewal Reminder', 
        }
    }
    emailReminder = () => {
        this.setState({
            open: false
        })
        axios({
            method: 'POST', 
            url: '/api/clients/email',
            data: {recipient: this.props.client.email_address, name: this.props.client.first_name, sessionsCompleted: this.props.session.length, sessionsTotal: this.props.client.sessions }
        }).then((response) => {
            alert(`Reminder sent to ${this.props.client.first_name} ${this.props.client.last_name}!`)
        }).catch((error) => {
            console.log('Error sending reminder. Please try again', error); 
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    render(){
        let sessionsLeft = this.props.client.sessions - this.props.session.length;
        let message= 
`Hi ${this.props.client.first_name}!
Just a reminder that your prepaid sessions are almost complete. You have ${sessionsLeft} more sessions until your card is full. 
You can renew your sessions in the studio  at your convenience. Thank you for your continued support and great efforts on your fitness goals! See you soon!
Be well!   
Sue Mackenzie`;
        return(
            <div>
                <IconButton variant="contained" color="secondary" onClick={this.handleOpen}><MailOutline/></IconButton>
                       <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={true}>
                       <DialogTitle>Send Reminder </DialogTitle>
                       <DialogContent>
                           <DialogContentText>To: {this.props.client.first_name} {this.props.client.last_name}</DialogContentText>
                           <DialogContentText>Subject: <TextField value={this.state.subject} disabled={true} fullWidth={true}/></DialogContentText>
                           <DialogContentText>Message: <TextField value={message} disabled={true} fullWidth={true} multiline={true}/></DialogContentText>
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
const mapStateToProps = state => ({
    client: state.clients.currentClient[0]
})
export default connect(mapStateToProps)(Email); 