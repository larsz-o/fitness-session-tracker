import { combineReducers } from 'redux';

const sessions = (state = [], action) => {
    if (action.type === 'SET_SESSIONS'){
        return action.payload;
    } 
    return state
}
const reminders = (state = [], action) => {
    if (action.type === 'SET_REMINDERS'){
        return action.payload;
    }
    return state;
}

export default combineReducers({
    sessions, 
    reminders
});