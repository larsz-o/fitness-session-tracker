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
    console.log('adding client'); 
    this.props.dispatch({type: 'ADD_CLIENT', payload: this.state})
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
        <NativeSelect value={this.state.view} onChange={(event)=>this.handleChangeFor(event, 'view')}>
          <option value="">---Select One---</option>
          <option value="add">Add Client</option>
          <option value="edit">View/Edit Clients</option>
        </NativeSelect>
        {this.state.view === 'add' && <FormControl>
          <TextField type="text" label="First Name" onChange={(event)=>this.handleChangeFor(event, 'first_name')}/>
          <TextField type="text" label="Last Name" onChange={(event)=>this.handleChangeFor(event, 'last_name')}/>
          <TextField type="text" label="Phone Number" onChange={(event)=>this.handleChangeFor(event, 'phone_number')}/>
          <TextField type="text" label="Email Address" onChange={(event)=>this.handleChangeFor(event, 'email_address')}/>
          <Button variant="outlined" color="secondary" onClick={this.addClient}>Add</Button>
        </FormControl>}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(ManageClients);
