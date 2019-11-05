import { combineReducers } from 'redux';
import todos from './todos';
import containers from './containers';

export default combineReducers({
    todos,
    containers
});