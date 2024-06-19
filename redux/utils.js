import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../src/firebase";
import { doc, setDoc } from "firebase/firestore"; // Import setDoc for writing documents
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

function WriteUserDoc() {
    // firebase constants
    const [user] = useAuthState(auth);
    if (!user) return; // Ensure user is not null
    const userRef = doc(db, 'users', user.uid);

    // Access userSlice from Redux store
    const userSlice = useSelector((state) => state.user.user);

    // write user cache to firestore
    setDoc(userRef, userSlice)
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

export { WriteUserDoc }
