import React, {Component} from 'react'; 
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core'; 
import { connect } from 'react-redux'; 

class EditButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false, 
            first_name: this.props.clientToEdit.first_name, 
            last_name: this.props.clientToEdit.last_name,
            email_address: this.props.clientToEdit.email_address,
            sessions: this.props.clientToEdit.sessions,
        }
    }
    editClient = () => {
        this.setState({
            open: false
        })
        this.props.dispatch({type: 'EDIT_CLIENT', payload: {first_name: this.state.first_name, last_name: this.state.last_name, email_address: this.state.email_address, sessions: this.state.sessions, id: this.props.clientToEdit.id}});
    }
    handleOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleChangeFor = (event, property) => {
        this.setState({
            ...this.state, 
            [property]: event.target.value
        })
    }
    render(){
        return(
        <div>
            <Button onClick={this.handleOpen}>Edit</Button>
            <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={true}>
            <DialogTitle>Edit Client Details</DialogTitle>
            <DialogContent>
                <TextField type="text" label="First Name" defaultValue={this.props.clientToEdit.first_name} onChange={(event)=>this.handleChangeFor(event, 'first_name')}/>
                <TextField type="text" label="Last Name" defaultValue={this.props.clientToEdit.last_name} onChange={(event)=>this.handleChangeFor(event, 'last_name')}/>
                <TextField type="text" label="Email Address" defaultValue={this.props.clientToEdit.email_address} onChange={(event)=>this.handleChangeFor(event, 'email_address')}/>
                <TextField type="text" label="Total Prepaid Sessions" defaultValue={this.props.clientToEdit.sessions} onChange={(event)=>this.handleChangeFor(event, 'sessions')}/>
                <DialogActions>
                     <Button onClick={this.handleClose}>Cancel</Button>
                    <Button onClick={this.editClient} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </DialogContent>
             </Dialog>
        </div>
        );
    }
}
export default connect()(EditButton); 