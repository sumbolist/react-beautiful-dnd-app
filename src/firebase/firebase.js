import * as firebase from 'firebase'

import FirebaseConfig from './configDev';
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("todos");
export const containersRef = databaseRef.child("containers");