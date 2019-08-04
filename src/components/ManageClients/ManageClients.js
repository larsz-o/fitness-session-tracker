import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import ManageRow from './ManageRow'; 
import EditButton from './EditButton';
import DeleteClient from '../DeleteClient/DeleteClient';
import '../ClientCard/clientcard.css';

let desktop = true; 

class ManageClients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'edit',
      // the value of 'view' will determine what the user sees, based on what they select in the menu 
      first_name: '',
      last_name: '',
      email_address: '', 
      sessions: 0, 
      isDesktop: desktop
    }
  }
  addClient = () => {
    this.props.dispatch({ type: 'ADD_CLIENT', payload: this.state });
    this.setState({
      view: 'edit', 
      first_name: '',
      last_name: '',
      email_address: '', 
      sessions: 0,
    })
  }
  componentDidMount(){
    this.props.dispatch({type: 'FETCH_CLIENTS'});
    this.props.dispatch({type: 'FETCH_SESSIONS'});
    window.addEventListener('resize', this.updatePredicate);
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.updatePredicate);
  }
  setView = (view) => {
    this.setState({
      view: view
    })
  }
  handleChangeFor = (event, property) => {
    this.setState({
      ...this.state, 
      [property]: event.target.value
    })
  }
  updatePredicate = () => {
    if (window.innerWidth < 1024){
      this.setState({
        isDesktop: false
    })
    } else {
      this.setState({
        isDesktop: true
      })
    }
    
}
  render() {
    if(window.innerWidth < 1024){
      desktop = false;
    } else {
      desktop = true;
    }

    return (
      <div className="body-div">
        <div className="flex-container-header">
            <h2>Manage Clients</h2>
        </div>
        {this.state.view !== 'add' && 
          <div className="center">
            <Button variant="contained" color="secondary" onClick={()=>this.setView('add')}>Add Client</Button>
        </div>}
       
        <div className="flex-container body-div">
          {this.state.view === 'add' &&
            <div className="add-form">
                <TextField autoComplete="off" type="text" variant="outlined" label="First Name" value={this.state.first_name} onChange={(event) => this.handleChangeFor(event, 'first_name')} />
                <TextField autoComplete="off" type="text" variant="outlined" label="Last Name" value={this.state.last_name} onChange={(event) => this.handleChangeFor(event, 'last_name')} />
                <TextField autoComplete="off" type="text" variant="outlined" label="Email Address" value={this.state.email_address} onChange={(event) => this.handleChangeFor(event, 'email_address')} />
                <TextField autoComplete="off" type="number" variant="outlined" label="Sessions Purchased" onChange={(event) =>this.handleChangeFor(event, 'sessions')}/>
                <Button color="primary" variant="contained" size="large" onClick={this.addClient}>Add</Button>
                <Button onClick={()=>this.setView('edit')}>Cancel</Button>
            </div>}
        {this.state.view === 'edit' && 
          <div>{this.state.isDesktop &&
            <Table className="manage-table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Prepaid Sessions</TableCell>
                  <TableCell>Sessions Remaining</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.props.clients.map((client, i) => {
          return(
            <ManageRow key={i} client={client}/>
          );
        })}
              </TableBody>
            </Table>}
            {!this.state.isDesktop && <div className="client-card-container">
                {this.props.clients.map((client, i) => {
                  return (
                    <div className="card" key={i}>
                      <div className="flex-box card-title"> <h3>{client.first_name} {client.last_name}</h3> <EditButton clientToEdit={client}/>
                      <DeleteClient client={client}/></div>
                      <p>Email: <a href={`mailto:${client.email_address}`}>{client.email_address}</a></p>
                     <div classNam="flex-box-right"><p>Prepaid Sessions: {client.sessions}</p>
                      <p>Sessions Remaining: 
                    &nbsp;{client.sessions - this.props.testing.filter(sess => sess.id === client.id).length}</p></div>
                   
                    </div>
                  )
                })}

            </div>}
        </div>}
   
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  clients: state.clients.clients,
  testing: state.sessions.sessions
});
export default connect(mapStateToProps)(ManageClients);
