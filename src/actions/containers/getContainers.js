import { containersRef } from '../../firebase/firebase';
import { FETCH_CONTAINERS } from '../types';

export default () => async dispatch => {
  containersRef.on("value", snapshot => {
    const containersObj = snapshot.val();
    const containersArray = Object.keys(containersObj).map(i => containersObj[i]);
    
    dispatch({
      type: FETCH_CONTAINERS,
      payload: containersArray
    });
  });
};