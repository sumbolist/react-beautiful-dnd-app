import { columnsRef } from "../../firebase/firebase";
import { FETCH_COLUMNS } from "../types";

export default () => async (dispatch, getState) => {
  const state = getState();
  const columnsToUpdate = [...state.columnsToUpdate];

  columnsToUpdate.forEach(column => {
    firebase
      .database()
      .ref("columns/" + column.id)
      .set({
        taskIds: column.taskIds
      });
  });

  dispatch({
    type: UPDATE_COLUMNS,
    payload: columnsToUpdate
  });
};
