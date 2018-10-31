import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchClients() {
    try {
        // fetch a list of all clients 
        const response = yield axios.get('/api/clients');
        yield put({ type: 'SET_CLIENTS', payload: response.data })
    } catch (error) {
        console.log('Error fetching clients', error);
    }
}
function* addClient(action) {
    try {
        // post a new client 
        yield axios.post('/api/clients', action.payload);
        yield put ({ type: 'FETCH_CLIENTS'}); 
    } catch (error) {
        console.log('Error adding clients', error); 
    }
}
function* clientSaga() {
    yield takeLatest('FETCH_CLIENTS', fetchClients);
    yield takeLatest('ADD_CLIENT', addClient);
}

export default clientSaga;