import { tasksRef } from "../../firebase/firebase";
import { FETCH_TASKS } from "../types";

export default () => async dispatch => {
  tasksRef.on("value", snapshot => {
    const tasksObj = snapshot.val();
    const tasksArray = Object.keys(tasksObj).map(i => tasksObj[i]);

    dispatch({
      type: FETCH_TASKS,
      payload: tasksArray
    });
  });
};
