import React, { Component } from 'react';
import './clientcard.css'
import { connect } from 'react-redux';
import LogSessions from '../LogSessionForm/LogSessionForm';
import Email from '../Email/Email'; 
import moment from 'moment';
import { IconButton, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons'; 
import axios from 'axios';

class ClientCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            reminder: []
        }
    }
    clearCard = () => {
        if(window.confirm('Are you sure to you want to clear this card? All records will be deleted and prepaid sessions will be reset to 0.')){
            this.props.dispatch({type: 'CLEAR_CARD', payload: this.props.currentClient.id})
        }
    }
    handleDelete = (session) => {
        if(window.confirm('Are you sure you want to delete this session?')){
            this.props.dispatch({type: 'DELETE_SESSION', payload: session})
        }
    }
    markSent = () => {
        // this.props.dispatch({type: 'MARK_EMAIL_SENT', payload: this.props.client.id});
        axios({
            method: 'POST',
            url: `/api/sessions/reminders?id=${this.props.client.id}`
        }).then((results) => {
            console.log(results)
            this.props.dispatch({type: 'FETCH_REMINDERS'})
        }).catch((error) => {
            console.log('Error posting email reminder sent');
        })
    }
    fetchReminders = () => {
        axios({
            method: 'GET',
            url: `/api/sessions/reminders`
        }).then((results) => {
           this.setState({
               reminders: results.data
           })
        }).catch((error) => {
            console.log('Getting reminders');
        })
    }
    render() {
        let sessions = this.props.sessions.filter(session => session.client_id === this.props.currentClient.id);
        let clientReminder = this.state.reminders.filter(reminder => reminder.client_id === this.props.currentClient.id);
        return (
            <div className="flex-container">
                <div className="card">
                    <div className="flex-box-header">
                        <h3>{this.props.currentClient.first_name} {this.props.currentClient.last_name}</h3>
                    <div className="flex-box-right">
                        {sessions.length >= (this.props.currentClient.sessions - 3) && <Email markSent={this.markSent} session={sessions}/>}
                        {sessions.length < this.props.currentClient.sessions && <LogSessions client={this.props.currentClient} />}
                    </div>
                    </div>
                    {JSON.stringify(this.state)}
                    {clientReminder.length > 0 && <div className="reminders">
                        {clientReminder[0].active && <p>Payment reminder sent: {moment(clientReminder[0].date).format('MMMM Do YYYY')}</p>}
                    </div>}
                    <p>Prepaid for {this.props.currentClient.sessions} sessions</p>
                    <div className="flex-box">
                        {sessions.map((session, i) => {
                            return (
                                <div className="date" key={i}>
                                    <p>{i + 1}. {moment(session.date).format('MM/DD/YYYY')} <IconButton><Delete onClick={()=>this.handleDelete(session)}/></IconButton></p>
                                </div>
                            );
                        })}
                    </div>
                    {sessions.length > 0 && <div className="bottom"><Button variant="contained" onClick={this.clearCard}>Mark Paid</Button></div>}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    sessions: state.sessions.sessions, 
    reminders: state.sessions.reminders,
    currentClient: state.clients.currentClient[0]
});
export default connect(mapStateToProps)(ClientCard); 