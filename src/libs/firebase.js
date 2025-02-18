// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLn_7jwuAxHoUl4NeZXXK8jPSpudSRU2U",
  authDomain: "winning-82c7f.firebaseapp.com",
  projectId: "winning-82c7f",
  storageBucket: "winning-82c7f.firebasestorage.app",
  messagingSenderId: "248723695316",
  appId: "1:248723695316:web:f21553ffbca6940f447d41"
};


/// Initialize Firebase
export default initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
