// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk78fVdAHy1Y3K2Z87eg72B3hpiwDrIlU",
  authDomain: "auth-77625.firebaseapp.com",
  projectId: "auth-77625",
  storageBucket: "auth-77625.firebasestorage.app",
  messagingSenderId: "501212557159",
  appId: "1:501212557159:web:f20dec06e356dc56ae09c2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);