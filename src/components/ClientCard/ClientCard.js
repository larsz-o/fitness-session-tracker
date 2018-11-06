import React, { Component } from 'react';
import './clientcard.css'
import { connect } from 'react-redux';
import LogSessions from '../LogSessionForm/LogSessionForm';
import Email from '../Email/Email'; 
import moment from 'moment';
import { IconButton, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons'; 


class ClientCard extends Component {
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
    render() {
        let sessions = this.props.sessions.filter(session => session.client_id === this.props.currentClient.id);
        return (
            <div className="flex-container">
                <div className="card">
                    <div className="flex-box-header">
                        <h3>{this.props.currentClient.first_name} {this.props.currentClient.last_name}</h3>
                    <div className="flex-box-right">
                        {sessions.length >= (this.props.currentClient.sessions - 3) && <Email session={sessions}/>}
                        {sessions.length < this.props.currentClient.sessions && <LogSessions client={this.props.currentClient} />}
                    </div>
                    </div>
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
                    {sessions.length > 0 && <div className="bottom"><Button variant="contained" onClick={this.clearCard}>Clear Card</Button></div>}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    sessions: state.sessions.sessions, 
    currentClient: state.clients.currentClient[0]
});
export default connect(mapStateToProps)(ClientCard); 