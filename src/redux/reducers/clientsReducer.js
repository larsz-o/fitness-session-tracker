import { combineReducers } from 'redux';

const clients = (state = [], action) => {
    if (action.type === 'SET_CLIENTS'){
        return action.payload;
    } 
    return state
}
const currentClient = (state = [], action) => {
    if (action.type === 'SET_CURRENT_CLIENT'){
        return action.payload;
    }
    return state; 
}

export default combineReducers({
    clients, 
    currentClient
});