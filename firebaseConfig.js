// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHs83wYWgFzLeoteU5dejscKB-YjSSavU",
  authDomain: "conexaosuassuna.firebaseapp.com",
  projectId: "conexaosuassuna",
  storageBucket: "conexaosuassuna.firebasestorage.app",
  messagingSenderId: "215053386297",
  appId: "1:215053386297:web:38e5690c84c384623383e8",
  measurementId: "G-RQMT00S00X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);