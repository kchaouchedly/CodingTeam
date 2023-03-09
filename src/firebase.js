// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG9dTewhfEhhVnjtCDRBSLkmB9KmfZbZ0",
  authDomain: "agricom-b1245.firebaseapp.com",
  projectId: "agricom-b1245",
  storageBucket: "agricom-b1245.appspot.com",
  messagingSenderId: "558949616503",
  appId: "1:558949616503:web:bddfdf6202868361f3ef72",
  measurementId: "G-CNGKV223NK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export { app, analytics, storage };