import React, {Component} from 'react'; 
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core'; 
import { connect } from 'react-redux'; 

const mapStateToProps = state => ({
    client: state.clients.currentClient
});

class EditButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false, 
            first_name: '', 
            last_name: '',
            phone_number: '',
            email_address: '',
            sessions: ''
        }
    }
    editClient = () => {

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
            [property]: event.target.value
        })
    }
    setClient = () => {
        console.log('setting current client'); 
        this.props.dispatch({type: 'SET_CURRENT_CLIENT', payload: this.props.clientToEdit});
        this.handleOpen();
    }
    render(){
        return(
        <div>
            <Button onClick={this.setClient}>Edit</Button>
            <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={true}>
            <DialogTitle>Edit</DialogTitle>
            <DialogContent>
                <TextField type="text" label="First Name" defaultValue={this.props.client.first_name} onChange={(event)=>this.handleChangeFor(event, 'first_name')}/>
                <TextField type="text" label="Last Name" defaultValue={this.props.client.last_name} onChange={(event)=>this.handleChangeFor(event, 'last_name')}/>
                <TextField type="text" label="Phone Number" defaultValue={this.props.client.phone_number} onChange={(event)=>this.handleChangeFor(event, 'phone_number')}/>
                <TextField type="text" label="Email Address" defaultValue={this.props.client.email_address} onChange={(event)=>this.handleChangeFor(event, 'email_address')}/>
                <TextField type="text" label="Total Prepaid Sessions" defaultValue={this.props.client.sessions} onChange={(event)=>this.handleChangeFor(event, 'sessions')}/>
                <DialogActions>
                     <Button onClick={this.handleClose}>Cancel</Button>
                    <Button onClick={this.editClient} variant="contained" color="primary">Edit</Button>
                </DialogActions>
            </DialogContent>
             </Dialog>
        </div>
        );
    }
}
export default connect(mapStateToProps)(EditButton); 