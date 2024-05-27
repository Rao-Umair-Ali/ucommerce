import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyD8DZ3Vtu7qc3Z3CYxDyE8KefBosp-8rbo",
    authDomain: "react-redux-firebase-796a1.firebaseapp.com",
    projectId: "react-redux-firebase-796a1",
    storageBucket: "react-redux-firebase-796a1.appspot.com",
    messagingSenderId: "798338422776",
    appId: "1:798338422776:web:f2d8a787f42972dcb5280d",
    measurementId: "G-N94FH2PPT1"
  };
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  
