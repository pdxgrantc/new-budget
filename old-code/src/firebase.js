import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbgm1NnjRz_mLX4aaqR96iUV3AifBoqd8",
    authDomain: "budget-a4c79.firebaseapp.com",
    projectId: "budget-a4c79",
    storageBucket: "budget-a4c79.appspot.com",
    messagingSenderId: "334523129983",
    appId: "1:334523129983:web:a1b33a574144fbcd4cdf4a",
    measurementId: "G-H0595C6H5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Items For Export
const auth = getAuth(app);
const db = getFirestore(app);

// My Helper Functions For Export


const SignOut = () => {
    signOut(auth);
}

export { auth, db, SignIn, SignOut };