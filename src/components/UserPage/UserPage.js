import React, { Component } from 'react';
import { connect } from 'react-redux';
import SessionsTable from '../SessionsTable/SessionsTable';
import LogSessions from '../LogSessionForm/LogSessionForm'; 

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }
  componentDidMount(){
    this.getClients();
    this.getSessions();
  }
  getClients = () => {
    this.props.dispatch({type: 'FETCH_CLIENTS'});
  }
  getSessions = () => {
    this.props.dispatch({type: 'FETCH_SESSIONS'}); 
  }

  render() {
    return (
      <div>
        <LogSessions/>
        <SessionsTable/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserPage);
