import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert'; 

function* addClient(action) {
    try {
        // post a new client 
        yield axios.post('/api/clients', action.payload);
        yield put ({ type: 'FETCH_CLIENTS'}); 
        swal('Success', 'Client added!', 'success');
    } catch (error) {
        console.log('Error adding clients', error); 
        alert('Error adding client'); 
    }
}
function* deleteClient(action) {
    try {
        // deletes all of a client's sessions then deletes the client 
        axios.delete(`/api/sessions/remove?id=${action.payload}`); 
        swal('Success', 'Client added!', 'success');
        yield put ({type: 'FETCH_CLIENTS'});
    } catch (error) {
        console.log('Error deleting client', error); 
        swal('Error', 'Error deleting client, please try again', 'error');
    }
}
function* editClient(action) {
    try {
        //edits a client's records
        console.log(action.payload);
        yield axios.put('/api/clients', action.payload);
        yield put ({type: 'FETCH_CLIENTS'});
        swal('Success', 'Client edited!', 'success');
    } catch (error) {
        console.log('Error editing client', error); 
        alert('Error editing client. Please try again.');
    }
}
function* fetchClients() {
    try {
        // fetch a list of all clients 
        const response = yield axios.get('/api/clients');
        yield put({ type: 'SET_CLIENTS', payload: response.data })
    } catch (error) {
        console.log('Error fetching clients', error);
    }
}
function* clientSaga() {
    yield takeLatest('FETCH_CLIENTS', fetchClients);
    yield takeLatest('ADD_CLIENT', addClient);
    yield takeLatest('EDIT_CLIENT', editClient); 
    yield takeLatest('DELETE_CLIENT', deleteClient); 
}

export default clientSaga;