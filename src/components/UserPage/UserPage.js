import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, NativeSelect, TextField } from '@material-ui/core';
import moment from 'moment'; 

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      client: '',
      date: ''
    }
  }
  componentDidMount(){
    this.getClients();
    this.getDate();
  }
  getClients = () => {
    this.props.dispatch({type: 'FETCH_CLIENTS'});
  }
  getDate = () => {
    let date = new Date(); 
    let today = moment(date).format('YYYY-MM-DD');
    this.setState({
      date: today
    });
    console.log(today); 
  }
  handleChangeFor = (event, property) => {
    this.setState({
      [property]: event.target.value 
    });
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
  logSession = () => {
    this.handleClose(); 
    this.props.dispatch({type: 'LOG_SESSION', payload: {client: this.state.client, date: this.state.date}})
  }
  render() {
    return (
      <div className="flex-container-home">
        <Button onClick={this.handleOpen} color="primary">Log Sessions</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Log Session</DialogTitle>
            <DialogContent>
            <NativeSelect onChange={(event)=>this.handleChangeFor(event, 'client')} value={this.state.client}>
              {this.props.clients.map((client, i) => {
                return (
                  <option key={i} value={client.id}>{client.first_name} {client.last_name}</option>
                )
              })}
              </NativeSelect>
              <TextField onChange={(event)=>this.handleChangeFor(event, 'date')} type="date" value={this.state.date} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button onClick={this.logSession}>Submit</Button>
            </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  clients: state.clients.clients
});

export default connect(mapStateToProps)(UserPage);
