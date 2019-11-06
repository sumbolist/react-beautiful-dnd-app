import * as firebase from "firebase";

import FirebaseConfig from "./configDev";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const tasksRef = databaseRef.child("tasks");
export const columnsRef = databaseRef.child("columns");
export const firebaseDb = firebase.database();
