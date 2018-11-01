import React, {Component} from 'react'; 
import { connect } from 'react-redux'; 
import { Table, TableCell, TableRow, TableHead, TableBody, Button } from '@material-ui/core'; 

class SessionsTable extends Component {
    render(){
        return(
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>One</TableCell>
                            <TableCell>Two</TableCell>
                            <TableCell>Three</TableCell>
                            <TableCell>Four</TableCell>
                            <TableCell>Five</TableCell>
                            <TableCell>Six</TableCell>
                            <TableCell>Seven</TableCell>
                            <TableCell>Eight</TableCell>
                            <TableCell>Nine</TableCell>
                            <TableCell>Ten</TableCell>
                            <TableCell>Contact</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.sessions.map((session, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{session.first_name} {session.last_name}</TableCell>
                                    <TableCell><Button>Email</Button></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    sessions: state.sessions.sessions,
  });
export default connect(mapStateToProps)(SessionsTable); 