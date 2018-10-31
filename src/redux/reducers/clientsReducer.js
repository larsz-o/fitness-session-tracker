import { combineReducers } from 'redux';

const clients = (state = [], action) => {
    if (action.type === 'SET_CLIENTS'){
        return action.payload;
    } 
    return state
}

export default combineReducers({
    clients
});