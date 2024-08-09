// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDny__4gUJCuaUzVruVLcJ90JA2bZmdPpk",
  authDomain: "fir-react-aa549.firebaseapp.com",
  projectId: "fir-react-aa549",
  storageBucket: "fir-react-aa549.appspot.com",
  messagingSenderId: "586006128185",
  appId: "1:586006128185:web:1569f11f6976c4235bcfe8",
  measurementId: "G-D0G1KK5DW4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
