// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8bZYryew_fY3Pv4gdwj4LbcjUZ5jrPpY",
  authDomain: "climate-analytics-dashboard.firebaseapp.com",
  projectId: "climate-analytics-dashboard",
  storageBucket: "climate-analytics-dashboard.firebasestorage.app",
  messagingSenderId: "383876909472",
  appId: "1:383876909472:web:faae0e92f2883d1007fcc5",
  measurementId: "G-VZL18T5RW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;