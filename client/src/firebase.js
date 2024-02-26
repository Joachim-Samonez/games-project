// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "games-review-2eafa.firebaseapp.com",
  projectId: "games-review-2eafa",
  storageBucket: "games-review-2eafa.appspot.com",
  messagingSenderId: "63031105491",
  appId: "1:63031105491:web:6050ac62dfd38028d14126",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
