import React, { Component } from 'react'; 
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons'; 
import { connect } from 'react-redux';
class DeleteClient extends Component {

    handleDelete = () => {
        if(window.confirm(`Are you sure you want to delete ${this.props.client.first_name} ${this.props.client.last_name}? This action cannot be undone.`)){
            this.props.dispatch({type: 'DELETE_CLIENT', payload: this.props.client.id});
        } else {
            alert(`${this.props.client.first_name} ${this.props.client.last_name} saved!`);
        }
    }
    render(){
        return(
            <IconButton onClick={()=>this.handleDelete(this.props.client.id)}><Delete/></IconButton>
        );
    }
}
export default connect()(DeleteClient); 