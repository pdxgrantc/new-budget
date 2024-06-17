import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';


export default function SignIn({ children }) {
    const [user] = useAuthState(auth);

    const SignInWithFirebase = async () => {

        let defaultUserDoc = {}

        const provider = new GoogleAuthProvider();

        try {
            // sign in prompt returns auth result
            const result = await signInWithPopup(auth, provider);
            // get user document reference for user doc
            const userRef = doc(db, 'users', result.user.uid);
            const userDocSnap = await getDoc(userRef);

            defaultUserDoc = {
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

            if (!userDocSnap.exists()) {
                // set user doc with default user doc
                await setDoc(userRef, defaultUserDoc);

                console.log("new user: ", defaultUserDoc);
                // Dispatch the setUser action with defaultUserDoc
                dispatchEvent(setUser(defaultUserDoc));
            } else {
                // get user data from user doc
                let userData = userDocSnap.data();
                console.log("existing user: ", userData);

            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <button onClick={SignInWithFirebase}>
            {children}
        </button>
    )
}
