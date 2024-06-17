import { db, auth } from '../firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SignInWithFirebase = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const userRef = doc(db, 'users', result.user.uid);
        const userDocSnap = await getDoc(userRef);

        if (!userDocSnap.exists()) {
            await setDoc(userRef, defaultUserDoc);
        }
    } catch (error) {
        console.log(error);
    }
};

export default function SignIn({ children }) {
    return (
        <button onClick={SignInWithFirebase}>
            {children}
        </button>
    )
}

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
