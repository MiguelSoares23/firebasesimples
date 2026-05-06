// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvt72ogPnIFk3hnR42dytGw6tXIOInxd4",
  authDomain: "aula06-9fd08.firebaseapp.com",
  projectId: "aula06-9fd08",
  storageBucket: "aula06-9fd08.firebasestorage.app",
  messagingSenderId: "266096477990",
  appId: "1:266096477990:web:d4f1593ded6f4eae47e3e7",
  measurementId: "G-XLBL6DH5YS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);