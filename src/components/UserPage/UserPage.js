import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClientCard from '../ClientCard/ClientCard';
import { NativeSelect } from '@material-ui/core';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }
  componentDidMount() {
    this.getClients();
    this.getSessions();
    this.getReminders();
  }
  getClients = () => {
    this.props.dispatch({ type: 'FETCH_CLIENTS' });
  }
  getReminders = () => {
    this.props.dispatch({ type: 'FETCH_REMINDERS'});
  }
  getSessions = () => {
    this.props.dispatch({ type: 'FETCH_SESSIONS' });
  }
  handleClientChange = (event) => {
    let id = parseInt(event.target.value); 
    // gets the whole client object that matches the client ID to send to redux 
    let clientToView = this.props.clients.filter(client => client.id === id); 
    this.props.dispatch({type: 'SET_CURRENT_CLIENT', payload: clientToView}); 
  }
  render() {
    return (
      <div className="body-div">
        <div className="flex-container-header">
            <h2>Select a Client</h2><br/>
          <NativeSelect className="clients-list" onChange={(event)=>this.handleClientChange(event)}>
          <option value=''></option>
          {this.props.clients.map((client, i) => {
            return (
              <option key={i} value={client.id}>{client.first_name} {client.last_name}</option>
            );
          })}
        </NativeSelect>
       
        </div>
    
        {this.props.currentClient.length > 0 && <ClientCard />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  clients: state.clients.clients,
  currentClient: state.clients.currentClient,
});

export default connect(mapStateToProps)(UserPage);
