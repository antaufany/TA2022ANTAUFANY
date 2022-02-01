// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/compat/performance";

import dotenv from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: "AIzaSyAE3h-DKyyi1NqTEJcxRAMCCHi7bmVsj2I",
  authDomain: "pdam-iot-65ebf.firebaseapp.com",
  databaseURL: "https://pdam-iot-65ebf-default-rtdb.firebaseio.com",
  projectId: "pdam-iot-65ebf",
  storageBucket: "pdam-iot-65ebf.appspot.com",
  messagingSenderId: "730063556872",
  appId: "1:730063556872:web:2e1a49bc5747ad57b49cbd",
  measurementId: "G-GTY6CK3HRP",
});

// Initialize Firebase

export const auth = app.auth();
export const database = app.database();
export const storage = app.firestore();
export const perf = app.performance();
export default app;

// signup router
