// Firebase
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const handleAddIncomeCategory = async (user, category) => {
    // remove spaces from edges of the string 
    category = category.trim();

    // get userRef
    const userRef = doc(db, 'users', user.uid);
    // fetch current data
    const userDocSnap = await getDoc(userRef);
    const userData = userDocSnap.data();

    // check if category already exists in active
    if (userData.incomeCategories.active.map(cat => cat.toLowerCase()).includes(category.toLowerCase())) {
        alert('Category already exists');
        return;
    }

    // check if category already exists in inactive
    if (userData.incomeCategories.inactive.map(cat => cat.toLowerCase()).includes(category.toLowerCase())) {
        // remove from inactive
        userData.incomeCategories.inactive = userData.incomeCategories.inactive.filter((cat) => cat.toLowerCase() !== category.toLowerCase());
        // add to active
        userData.incomeCategories.active.push(category);
    } else {
        // add to active
        userData.incomeCategories.active.push(category);
    }

    // write updated data back to the database
    await updateDoc(userRef, {
        incomeCategories: userData.incomeCategories,
        spendingCategories: userData.spendingCategories,
        spendingAccounts: userData.spendingAccounts,
    });
};

const handleAddSpendingCategory = async (user, category) => {
    // remove spaces from edges of the string 
    category = category.trim();

    // get userRef
    const userRef = doc(db, 'users', user.uid);
    // fetch current data
    const userDocSnap = await getDoc(userRef);
    const userData = userDocSnap.data();

    // check if category already exists in active
    if (userData.spendingCategories.active.map(cat => cat.toLowerCase()).includes(category.toLowerCase())) {
        alert('Category already exists');
        return;
    }

    // check if category already exists in inactive
    if (userData.spendingCategories.inactive.map(cat => cat.toLowerCase()).includes(category.toLowerCase())) {
        // remove from inactive
        userData.spendingCategories.inactive = userData.spendingCategories.inactive.filter((cat) => cat.toLowerCase() !== category.toLowerCase());
        // add to active
        userData.spendingCategories.active.push(category);
    } else {
        // add to active
        userData.spendingCategories.active.push(category);
    }

    // write updated data back to the database
    await updateDoc(userRef, {
        incomeCategories: userData.incomeCategories,
        spendingCategories: userData.spendingCategories,
        spendingAccounts: userData.spendingAccounts,
    });
};

const handleAddSpendingAccount = async (user, category) => {
    // remove spaces from edges of the string 
    category = category.trim();

    // get userRef
    const userRef = doc(db, 'users', user.uid);
    // fetch current data
    const userDocSnap = await getDoc(userRef);
    const userData = userDocSnap.data();

    // check if category already exists in active
    if (userData.spendingAccounts.active.map(acc => acc.toLowerCase()).includes(category.toLowerCase())) {
        alert('Account already exists');
        return;
    }

    // check if category already exists in inactive
    if (userData.spendingAccounts.inactive.map(acc => acc.toLowerCase()).includes(category.toLowerCase())) {
        // remove from inactive
        userData.spendingAccounts.inactive = userData.spendingAccounts.inactive.filter((acc) => acc.toLowerCase() !== category.toLowerCase());
        // add to active
        userData.spendingAccounts.active.push(category);
    } else {
        // add to active
        userData.spendingAccounts.active.push(category);
    }

    // write updated data back to the database
    await updateDoc(userRef, {
        incomeCategories: userData.incomeCategories,
        spendingCategories: userData.spendingCategories,
        spendingAccounts: userData.spendingAccounts,
    });
};

export { handleAddIncomeCategory, handleAddSpendingCategory, handleAddSpendingAccount };
