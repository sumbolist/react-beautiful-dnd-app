import { FETCH_TODOS } from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
};