import { FETCH_CONTAINERS } from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_CONTAINERS:
      return {
        ...state,
        containers: action.payload
      };
    default:
      return state;
  }
};