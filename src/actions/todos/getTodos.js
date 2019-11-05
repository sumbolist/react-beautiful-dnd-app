import { todosRef } from '../../firebase/firebase';
import { FETCH_TODOS } from '../types';

export const addToDo = newToDo => async dispatch => {
  todosRef.push().set(newToDo);
};

export const completeToDo = completeToDoId => async dispatch => {
  todosRef.child(completeToDoId).remove();
};

export default () => async dispatch => {
  todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};