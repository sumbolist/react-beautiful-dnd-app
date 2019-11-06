import { FETCH_TASKS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
};
