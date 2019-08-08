import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment'; 

function* clearCard(action) {
    try {
        yield axios.delete(`/api/sessions/clear?id=${action.payload}`);
        alert('Card cleared!');
        yield put ({type: 'FETCH_CLIENTS'}); 
        yield put ({type: 'FETCH_SESSIONS'});
    } catch (error){
        console.log('Error deleting card', error); 
    }
}
function* deleteSession(action) {
    try {
        yield axios.delete(`/api/sessions?id=${action.payload.session_id}`);
        alert(`Session on ${moment(action.payload.date).format('MM/DD/YYYY')} deleted.`); 
        yield put ({type: 'FETCH_SESSIONS'});
    } catch (error) {
        console.log('Error deleting session', error); 
    }
}
function* markSent(action) {
    try {
        yield axios.put(`/api/sessions/reminders?id=${action.payload.id}`);
        yield put ({type: 'FETCH_REMINDERS'});
    } catch ( error ){
        console.log('Error marking email as sent')
    }
}
function* fetchReminders(){
    try {
        yield axios.get('/api/sessions/reminders');
        yield put ({type: 'SET_REMINDERS'});
    } catch (error) {
        console.log('Error fetching reminders');
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
    yield takeLatest('FETCH_REMINDERS', fetchReminders);
    yield takeLatest('MARK_EMAIL_SENT', markSent);
}

export default sessionSaga;


