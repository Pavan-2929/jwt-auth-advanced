// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-jwt.firebaseapp.com",
  projectId: "mern-auth-jwt",
  storageBucket: "mern-auth-jwt.appspot.com",
  messagingSenderId: "223826406707",
  appId: "1:223826406707:web:ef56119378ed55d039a246",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
