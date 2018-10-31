import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* logSession(action) {
    try {
        // logs a new session
        yield axios.post('/api/sessions', action.payload);
        yield put({ type: 'FETCH_SESSIONS' })
    } catch (error) {
        console.log('Error fetching clients', error);
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

function* sessionSaga() {
    yield takeLatest('LOG_SESSION', logSession);
    yield takeLatest('FETCH_SESSIONS', fetchSessions);

}

export default sessionSaga;


