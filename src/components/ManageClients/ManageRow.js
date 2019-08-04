import React, {Component} from 'react'; 
import { TableCell, TableRow } from '@material-ui/core'; 
import EditButton from './EditButton'; 
import { connect } from 'react-redux'; 
import DeleteClient from '../DeleteClient/DeleteClient'; 

class ManageRow extends Component {
    render(){
        return(
            <TableRow>
            <TableCell>{this.props.client.first_name}</TableCell>
            <TableCell>{this.props.client.last_name}</TableCell>
            <TableCell><a href={`mailto:${this.props.client.email_address}`}>{this.props.client.email_address}</a></TableCell>
            <TableCell>{this.props.client.sessions}</TableCell>
            <TableCell><EditButton clientToEdit={this.props.client}/></TableCell>
            <TableCell><DeleteClient client={this.props.client}/></TableCell>
          </TableRow>
        );
    }
}
export default connect()(ManageRow); 