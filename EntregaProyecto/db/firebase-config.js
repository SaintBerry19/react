// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIBC_F5C3sQE6HZdubuAmFKYQ5QMN0Vog",
  authDomain: "mobastudio-5aec4.firebaseapp.com",
  projectId: "mobastudio-5aec4",
  storageBucket: "mobastudio-5aec4.appspot.com",
  messagingSenderId: "1029324889317",
  appId: "1:1029324889317:web:4c6ec923d73ba2afbb880c",
  measurementId: "G-CDVBQWY8QR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
