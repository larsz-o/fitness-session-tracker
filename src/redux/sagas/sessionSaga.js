import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment'; 

function* clearCard(action) {
    try {
        yield axios.delete(`/api/sessions/clear?id=${action.payload}`);
        yield put ({type: 'FETCH_SESSIONS'}); 
    } catch (error){
        console.log('Error deleting card', error); 
    }
}
function* deleteSession(action) {
    try {
        yield axios.delete(`/api/sessions?id=${action.payload.session_id}`);
        alert(`Session on ${moment(action.payload.date).format('MM/DD/YYYY')} deleted.`); 
        yield put ({type: 'FETCH_SESSIONS'})
    } catch (error) {
        console.log('Error deleting session', error); 
    }
}
function* fetchSessions() {
    try {
        // gets all sessions for all existing clients 
       const sessions = yield axios.get('/api/sessions'); 
       yield put ({type: 'SET_SESSIONS', payload: sessions.data}); 
    } catch (error) {
        console.log('Error fetching sessions', error); 
    }
}
function* logSession(action) {
    try {
        // logs a new session
        yield axios.post('/api/sessions', action.payload);
        yield put({ type: 'FETCH_SESSIONS' })
    } catch (error) {
        console.log('Error fetching clients', error);
    }
}
function* sessionSaga() {
    yield takeLatest('LOG_SESSION', logSession);
    yield takeLatest('FETCH_SESSIONS', fetchSessions);
    yield takeLatest('DELETE_SESSION', deleteSession);
    yield takeLatest('CLEAR_CARD', clearCard);
}

export default sessionSaga;


