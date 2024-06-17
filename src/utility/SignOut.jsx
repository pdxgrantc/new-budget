import React from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../redux/userSlice'; // Adjust the import path according to your project structure
import { SignOutWithFirebase } from '../firebase';

export default function SignOut({ children }) {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        // Dispatch action to remove data from redux store
        dispatch(clearUser());

        // Sign out from Firebase
        SignOutWithFirebase();
    };

    return (
        <button onClick={handleSignOut}>
            {children}
        </button>
    );
}