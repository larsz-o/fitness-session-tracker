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
            subject: 'Personal Training Session Renewal Reminder', 
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
        let message= 
`Hi ${this.props.client.first_name}!
I hope you have enjoyed our personal training sessions. I'm writing to let you know that you just finished ${this.props.session.length} of your ${this.props.client.sessions} prepaid sessions. 
                    
Nice work! 
        
If you'd like to sign up for more, you can do so by calling me at (508) 366-8700 or by dropping by the studio.
        
Thanks for being a great client! 
        
From, 
        
Sue Mackenzie 
Fitness Meets Wellness`;
        return(
            <div>
                <IconButton variant="contained" color="secondary" onClick={this.handleOpen}><MailOutline/>Email</IconButton>
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