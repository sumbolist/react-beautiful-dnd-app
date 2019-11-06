import { FETCH_COLUMNS } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_COLUMNS:
      return {
        ...state,
        columns: action.payload
      };
    default:
      return state;
  }
};
