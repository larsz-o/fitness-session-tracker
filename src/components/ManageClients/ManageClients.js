import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NativeSelect, FormControl, TextField, Button } from '@material-ui/core';

class ManageClients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: '',
      // the value of 'view' will determine what the user sees, based on what they select in the menu 
      first_name: '',
      last_name: '',
      phone_number: '',
      email_address: ''
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
        <h2>
          Manage Clients
      </h2>
        <div className="flex-container">
          <NativeSelect value={this.state.view} onChange={(event) => this.handleChangeFor(event, 'view')}>
            <option value="">---Select One---</option>
            <option value="add">Add Client</option>
            <option value="edit">View/Edit Clients</option>
          </NativeSelect>
        </div>
        <div className="flex-container">
          {this.state.view === 'add' &&
            <div>
              <FormControl>
                <TextField autoComplete="off" type="text" variant="outlined" label="First Name" onChange={(event) => this.handleChangeFor(event, 'first_name')} />
              </FormControl><br/>
              <FormControl>
                <TextField autoComplete="off" type="text" variant="outlined" label="Last Name" onChange={(event) => this.handleChangeFor(event, 'last_name')} />
              </FormControl><br/>
              <FormControl>
                <TextField autoComplete="off" type="text" variant="outlined" label="Phone Number" onChange={(event) => this.handleChangeFor(event, 'phone_number')} />
              </FormControl><br/>
              <FormControl>
                <TextField autoComplete="off" type="text" variant="outlined" label="Email Address" onChange={(event) => this.handleChangeFor(event, 'email_address')} />
              </FormControl><br/>
              <FormControl>
                <Button onClick={this.changeView}>Cancel</Button>
              </FormControl>
              <FormControl>
                <Button color="secondary" variant="contained" size="large" onClick={this.addClient}>Add</Button>
              </FormControl>
            </div>}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(ManageClients);
