import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, NativeSelect, TextField } from '@material-ui/core';
import moment from 'moment';


class LogSessionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            date: '',
            client: parseInt(this.props.client.id)
        }
    }
    componentDidMount() {
        this.getDate();
    }
    getDate = () => {
        let date = new Date();
        let today = moment(date).format('YYYY-MM-DD');
        this.setState({
            date: today
        });
        console.log(today);
    }
    handleChangeFor = (event, property) => {
        this.setState({
            [property]: event.target.value,
        });
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleOpen = () => {
        this.setState({
          open: true
        })
      }
    logSession = () => {
        this.handleClose();
        this.props.dispatch({ type: 'LOG_SESSION', payload: { client: this.state.client, date: this.state.date } })
    }
    render() {
        return (
            <div className="float-right">
                <Button onClick={this.handleOpen} color="primary">Log Session</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Log Session</DialogTitle>
                    <DialogContent>
                        <TextField onChange={(event) => this.handleChangeFor(event, 'date')} type="date" value={this.state.date} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.logSession}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(LogSessionForm);