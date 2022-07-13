// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebase from "firebase";
import "@firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9FOS1T_8HYxGb-ISIauvxoxlWpWJVr9s",
  authDomain: "blood-donation-app-expo.firebaseapp.com",
  projectId: "blood-donation-app-expo",
  storageBucket: "blood-donation-app-expo.appspot.com",
  messagingSenderId: "540281164404",
  appId: "1:540281164404:web:1d01e315dcd0ea2151b721",
  measurementId: "G-21FECCL178",
};

// Initialize Firebase
if (firebase.apps.length > 0 === false) {
  firebase.initializeApp(firebaseConfig);
}
// const analytics = getAnalytics(firebase);

export { firebase };
