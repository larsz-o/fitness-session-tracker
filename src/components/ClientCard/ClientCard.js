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
        if(window.confirm('Are you sure to you want to clear this card? This action cannot be undone. All records will be deleted.')){
            this.props.dispatch({type: 'CLEAR_CARD', payload: this.props.clientToView.id})
        }
    }
    handleDelete = (session) => {
        if(window.confirm('Are you sure you want to delete this session?')){
            this.props.dispatch({type: 'DELETE_SESSION', payload: session})
        }
    }
    render() {
        let sessions = this.props.sessions.filter(session => session.client_id === this.props.clientToView.id);
        return (
            <div className="flex-container">
                <div className="card">
                    <div className="flex-box-header">
                        <h3>{this.props.clientToView.first_name} {this.props.clientToView.last_name}</h3>
                        {sessions.length >= 7 && <Email clientToView={this.props.clientToView} session={sessions}/>}
                        {sessions.length < 10 && <LogSessions client={this.props.clientToView} />}
                    </div>
                    <div className="flex-box">
                        {sessions.map((session, i) => {
                            return (
                                <div className="date" key={i}>
                                    <p>{i + 1}. {moment(session.date).format('MM/DD/YYYY')} <IconButton><Delete onClick={()=>this.handleDelete(session)}/></IconButton></p>
                                </div>
                            );
                        })}
                    </div>
                    {sessions.length > 0 && <Button onClick={this.clearCard}>Clear Card</Button>}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    sessions: state.sessions.sessions
});
export default connect(mapStateToProps)(ClientCard); 