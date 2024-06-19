import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { setUser } from '../../redux/userSlice'; // Import the action to update the user in the Redux store
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

export default function Settings() {
    const [user] = useAuthState(auth);
    const userSlice = useSelector((state) => state.user.user);

    

    const printUserSlice = () => {
        console.log(userSlice);
    }

    return (
        <>
            <Helmet>
                <title>Settings</title>
                <meta name="description" content="Settings" />
            </Helmet>
            <div>Settings</div>

            <button onClick={printUserSlice}>Print User Slice</button>
            <div>
                <SpendingAccounts />
                <SpendingCategories />
                <IncomeCategories />
            </div>
        </>
    );
}

function SpendingAccounts() {
    const userSlice = useSelector((state) => state.user.user);
    if (!userSlice || !userSlice.spendingAccounts || !userSlice.spendingAccounts.active) return null;
    return (
        <div>
            <h1>Spending Accounts</h1>
            {userSlice.spendingAccounts.active.map((account) => (
                <div key={account}>{account}</div>
            ))}
        </div>
    );
}

function SpendingCategories() {
    const userSlice = useSelector((state) => state.user.user);
    if (!userSlice || !userSlice.spendingCategories || !userSlice.spendingCategories.active) return null;
    return (
        <div>
            <h1>Spending Categories</h1>
            {userSlice.spendingCategories.active.map((category) => (
                <div key={category}>{category}</div>
            ))}
        </div>
    );
}

function IncomeCategories() {
    const userSlice = useSelector((state) => state.user.user);
    if (!userSlice || !userSlice.incomeCategories || !userSlice.incomeCategories.active) return null;
    return (
        <div>
            <h1>Income Categories</h1>
            {userSlice.incomeCategories.active.map((category) => (
                <div key={category}>{category}</div>
            ))}
        </div>
    );
}