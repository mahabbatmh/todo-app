import { combineReducers } from 'redux'
import TodoReducer from './todo';

const reducers = {
    todo: TodoReducer
}

export default combineReducers(reducers);