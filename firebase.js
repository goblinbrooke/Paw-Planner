// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_Ql73uYw8qna-w4hiiNHSlGHsw4QwRzg",
  authDomain: "paw-planner.firebaseapp.com",
  projectId: "paw-planner",
  storageBucket: "paw-planner.appspot.com",
  messagingSenderId: "187624919709",
  appId: "1:187624919709:web:49b3de8e6b02bf0ac0ba74",
};
console.log("initializing app");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("app initialized");

console.log("app initialized");

export { app };

// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD_Ql73uYw8qna-w4hiiNHSlGHsw4QwRzg",
//   authDomain: "paw-planner.firebaseapp.com",
//   projectId: "paw-planner",
//   storageBucket: "paw-planner.appspot.com",
//   messagingSenderId: "187624919709",
//   appId: "1:187624919709:web:49b3de8e6b02bf0ac0ba74",
// };

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app()
// }

// const auth = firebase.auth()
