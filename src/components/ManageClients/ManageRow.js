import React, {Component} from 'react'; 
import { TableCell, TableRow } from '@material-ui/core'; 
import EditButton from './EditButton'; 
import { connect } from 'react-redux'; 

class ManageRow extends Component {
    render(){
        return(
            <TableRow>
            <TableCell>{this.props.client.first_name}</TableCell>
            <TableCell>{this.props.client.last_name}</TableCell>
            <TableCell>{this.props.client.phone_number}</TableCell>
            <TableCell>{this.props.client.email_address}</TableCell>
            <TableCell>{this.props.client.sessions}</TableCell>
            <TableCell><EditButton clientToEdit={this.props.client}/></TableCell>
          </TableRow>
        );
    }
}
export default connect()(ManageRow); 