import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export const config = {
  apiKey: "AIzaSyBO704fjAubsf5hhexNNjlstJAbY1OvwKs",
  authDomain: "chat-app-6ae0c.firebaseapp.com",
  databaseURL: "https://chat-app-6ae0c.firebaseio.com",
  projectId: "chat-app-6ae0c",
  storageBucket: "chat-app-6ae0c.appspot.com",
  messagingSenderId: "663141972904",
  appId: "1:663141972904:web:57f16b631a8928e2e7fb9d",
  measurementId: "G-T8MD4CVLCY",
};

firebase.initializeApp(config);

firebase.firestore();

export default firebase;
