import React, { Component } from 'react';
import './clientcard.css'
import { connect } from 'react-redux';
import LogSessions from '../LogSessionForm/LogSessionForm';
import moment from 'moment';

class ClientCard extends Component {
    render() {
        let sessions = this.props.sessions.filter(session => session.client_id === this.props.clientToView.id);
        return (
            <div className="flex-container">
                <div className="card">
                    {this.props.clientToView.first_name} {this.props.clientToView.last_name}
                    <LogSessions client={this.props.clientToView} />
                    {sessions.map((session, i) => {
                        return (
                            <div key={i}>{moment(session.date).format('MM/DD/YYYY')}</div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    sessions: state.sessions.sessions
});
export default connect(mapStateToProps)(ClientCard); 