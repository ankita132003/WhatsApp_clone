// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyC5JyPYDwzb1Qs_MfmswU9dfFjXoJwQedU",
  authDomain: "whats-app-clone-b3978.firebaseapp.com",
  projectId: "whats-app-clone-b3978",
  storageBucket: "whats-app-clone-b3978.appspot.com",
  messagingSenderId: "657474942153",
  appId: "1:657474942153:web:ef64bc59a8dade9eafc918",
  measurementId: "G-QG59T4B80Q"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;

