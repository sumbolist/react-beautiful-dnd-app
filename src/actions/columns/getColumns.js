import { columnsRef } from "../../firebase/firebase";
import { FETCH_COLUMNS } from "../types";

export default () => async dispatch => {
  columnsRef.on("value", snapshot => {
    const columnsObj = snapshot.val();
    const columnsArray = Object.keys(columnsObj).map(i => columnsObj[i]);

    dispatch({
      type: FETCH_COLUMNS,
      payload: columnsArray
    });
  });
};
