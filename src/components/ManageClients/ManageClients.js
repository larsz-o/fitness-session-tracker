import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NativeSelect, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import ManageRow from './ManageRow'; 

class ManageClients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      // the value of 'view' will determine what the user sees, based on what they select in the menu 
      first_name: '',
      last_name: '',
      phone_number: '',
      email_address: '', 
      sessions: ''
    }
  }
  addClient = () => {
    this.props.dispatch({ type: 'ADD_CLIENT', payload: this.state })
  }
  changeView = () => {
    this.setState({
      view: ''
    })
  }
  handleChangeFor = (event, property) => {
    this.setState({
      [property]: event.target.value
    })
  }
  render() {
    return (
      <div>
        <div className="flex-container">
            <h2>Manage Clients</h2>
        </div>
        <div className="flex-container">
          <NativeSelect value={this.state.view} onChange={(event) => this.handleChangeFor(event, 'view')}>
            <option value="">---Select One---</option>
            <option value="add">Add Client</option>
            <option value="edit">View/Edit Clients</option>
          </NativeSelect>
        </div>
        <div className="flex-container">
          {this.state.view === 'add' &&
            <div className="add-form">
                <TextField autoComplete="off" type="text" variant="outlined" label="First Name" value={this.state.first_name} onChange={(event) => this.handleChangeFor(event, 'first_name')} />
                <TextField autoComplete="off" type="text" variant="outlined" label="Last Name" value={this.state.last_name} onChange={(event) => this.handleChangeFor(event, 'last_name')} />
                <TextField autoComplete="off" type="text" variant="outlined" label="Phone Number" value={this.state.phone_number} onChange={(event) => this.handleChangeFor(event, 'phone_number')} />
                <TextField autoComplete="off" type="text" variant="outlined" label="Email Address" value={this.state.email_address} onChange={(event) => this.handleChangeFor(event, 'email_address')} />
                <TextField autoComplete="off" type="number" variant="outlined" label="Sessions Purchased" value={this.state.sessions} onChange={(event) =>this.handleChangeFor(event, 'sessions')}/>
                <Button color="primary" variant="contained" size="large" onClick={this.addClient}>Add</Button>
                <Button onClick={this.changeView}>Cancel</Button>
            </div>}
        {this.state.view === 'edit' && 
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Prepaid Sessions</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.props.clients.map((client, i) => {
          return(
            <ManageRow key={i} client={client}/>
          );
        })}
              </TableBody>
            </Table>
        </div>}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  clients: state.clients.clients
});
export default connect(mapStateToProps)(ManageClients);
