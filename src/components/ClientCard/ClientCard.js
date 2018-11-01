import React, { Component } from 'react';
import './clientcard.css'
import { connect } from 'react-redux';
import LogSessions from '../LogSessionForm/LogSessionForm';

class ClientCard extends Component {
    render() {
        return (
            <div className="flex-container">
                <div className="card">
                {this.props.clientToView.first_name} {this.props.clientToView.last_name}
                <LogSessions client={this.props.clientToView}/>
                </div>
            </div>
        );
    }
}
export default connect()(ClientCard); 