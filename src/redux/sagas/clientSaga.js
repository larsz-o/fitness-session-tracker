import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchClients() {
    try {
        // fetch a list of all clients 
       const response = yield axios.get('/api/clients');
       yield put({type: 'SET_CLIENTS', payload: response.data})
    } catch (error) {
        console.log('Error fetching clients', error); 
    }
}

function* clientSaga() {
    yield takeLatest('FETCH_CLIENTS', fetchClients);
  }
  
  export default clientSaga;