import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux';

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
const SignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const db = getFirestore();
        const userRef = doc(db, 'users', result.user.uid);
        const userDocSnap = await getDoc(userRef);

        if (!userDocSnap.exists()) {
            const defaultUserDoc = {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                uid: result.user.uid,
                accountCreated: new Date(),
                currentBalance: 0,
                userVersion: 1,
                incomeCategories: {
                    active: [
                        "Salary",
                        "Investments",
                        "Gifts",
                        "Other",
                    ],
                    inactive: []
                },
                spendingCategories: {
                    active: [
                        "Groceries",
                        "Rent",
                        "Utilities",
                        "Entertainment",
                        "Transportation",
                        "Restaurants",
                        "Other",
                    ],
                    inactive: []
                },
                spendingAccounts: {
                    active: [
                        "Debit",
                        "Credit",
                        "Cash",
                        "Other",
                    ],
                    inactive: []
                },
            }

            await setDoc(userRef, defaultUserDoc).then(() => {
                // TODO write default user doc to redux store
                dispatch(setUser(defaultUserDoc)); // dispatch action to set user state

            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const SignOut = () => {
    signOut(auth);
}

export { auth, db, SignIn, SignOut };