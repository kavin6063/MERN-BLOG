// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-5961a.firebaseapp.com",
  projectId: "mern-blog-5961a",
  storageBucket: "mern-blog-5961a.appspot.com",
  messagingSenderId: "746697360034",
  appId: "1:746697360034:web:93afa4ed3c36e9749bcdfb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
