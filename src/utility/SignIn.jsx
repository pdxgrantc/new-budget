import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

export default function SignIn({ children }) {
    const [user] = useAuthState(auth);
    const dispatchEvent = useDispatch();

    const SignInWithFirebase = async () => {
        let userDoc = {};

        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const userRef = doc(db, 'users', result.user.uid);
            const userDocSnap = await getDoc(userRef);

            const defaultUserDoc = {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                uid: result.user.uid,
                accountCreated: new Date().toISOString(),  // Convert to ISO string
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
            };

            if (!userDocSnap.exists()) {
                userDoc = defaultUserDoc;
                await setDoc(userRef, userDoc);
            } else {
                let cachedUserDoc = userDocSnap.data();
                cachedUserDoc.accountCreated = cachedUserDoc.accountCreated.toDate().toISOString();  // Convert to ISO string

                userDoc = cachedUserDoc;
            }
        } catch (error) {
            console.log(error);
        }

        console.log(userDoc);
        dispatchEvent(setUser(userDoc));  // Dispatch the action with serializable data
    };

    return (
        <button onClick={SignInWithFirebase}>
            {children}
        </button>
    );
}
