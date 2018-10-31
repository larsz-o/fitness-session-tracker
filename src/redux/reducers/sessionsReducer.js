import { combineReducers } from 'redux';

const sessions = (state = [], action) => {
    if (action.type === 'SET_SESSIONS'){
        return action.payload;
    } 
    return state
}

export default combineReducers({
    sessions
});