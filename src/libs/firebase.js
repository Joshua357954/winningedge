// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMbHHoonEkvAFhIT6fiDymJfLSkc5nCpw",
  authDomain: "winning--edge.firebaseapp.com",
  projectId: "winning--edge",
  storageBucket: "winning--edge.firebasestorage.app",
  messagingSenderId: "901357602953",
  appId: "1:901357602953:web:ed543877eeb424f5a21e58"
};

/// Initialize Firebase
export default initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

