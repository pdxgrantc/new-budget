import { useState } from 'react';
import { Helmet } from 'react-helmet';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateUser } from '../../redux/userSlice'; // Import the action to update the user in the Redux store

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';


export default function Settings() {
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
    const dispatch = useDispatch(); // Initialize useDispatch
    const userSlice = useSelector((state) => state.user.user);

    const handleSubmit = (e) => {
        e.preventDefault();

        // check to see if user input is a duplicate entry 
        if (userSlice.spendingAccounts.active.includes(e.target.account.value)) {
            // Clear input
            e.target.account.value = '';
            // alert user that account already exists
            alert('Account already exists');
            return;
        }

        const newUserSlice = {
            ...userSlice,
            spendingAccounts: {
                ...userSlice.spendingAccounts,
                active: [...userSlice.spendingAccounts.active, e.target.account.value],
            },
        };

        dispatch(updateUser(newUserSlice)); // Dispatch the action

        e.target.account.value = ''; // Clear input
    };

    if (!userSlice || !userSlice.spendingAccounts || !userSlice.spendingAccounts.active) return null;
    return (
        <>
            <div>
                <h1>Spending Accounts</h1>
                {userSlice.spendingAccounts.active.map((account) => (
                    <div key={account}>{account}</div>
                ))}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="account" />
                    <button type="submit">Add Account</button>
                </form>
            </div>
        </>
    );
}

function SpendingCategories() {
    const userSlice = useSelector((state) => state.user.user);
    const [userInput, setUserInput] = useState('');

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