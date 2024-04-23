import { useEffect, useState } from "react"

// firebase
import { auth, db } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";


export default function Settings() {
  return (
    <>
      <div>Settings</div>
      <ChangeCategories />
    </>
  )
}

function ChangeCategories() {
  const [incomeCategories, setIncomeCategories] = useState();
  const [spendingAccounts, setSpendingAccounts] = useState();
  const [spendingCategories, setSpendingCategories] = useState();

  useEffect(() => {
    const user = auth.currentUser;
    const userRef = doc(db, 'users', user.uid);

    // subscribe to updates
    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      const userData = docSnapshot.data();

      // set data to state
      setIncomeCategories(userData.incomeCategories);
      setSpendingAccounts(userData.spendingAccounts);
      setSpendingCategories(userData.spendingCategories);
    });

    // unsubscribe on cleanup
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div>Income Categories</div>
        <CurrentCategories categories={incomeCategories} />
        <AddCategory type="incomeCategories" />
      </div>
      <div>
        <div>Accounts</div>
        <CurrentCategories categories={spendingAccounts} />
        <AddCategory type="spendingAccounts" />
      </div>
      <div>
        <div>Spending Categories</div>
        <CurrentCategories categories={spendingCategories} />
        <AddCategory type="spendingCategories" />
      </div>
    </div>
  )
}

function CurrentCategories({ categories }) {
  return (
    <div>
      {categories?.active.map((category) => {
        return <div key={category}>{category}</div>
      })}
    </div>
  )
}

function incomeCategories() {

  return (
    <></>
  )
}

function AddCategory({ type }) {
  const [category, setCategory] = useState('');

  const handleAddCategory = async (event) => {
    event.preventDefault();

    console.log('Adding category:', category, "type:", type);

    // get current user and userRef
    const user = auth.currentUser;
    const userRef = doc(db, 'users', user.uid);

    // fetch current data
    const userDocSnap = await getDoc(userRef);
    const userData = userDocSnap.data();

    // update the correct array
    if (type === 'incomeCategories') {
      userData.incomeCategories.active.push(category);
      setIncomeCategories(userData.incomeCategories);
    } else if (type === 'spendingAccounts') {
      userData.spendingAccounts.active.push(category);
      setSpendingAccounts(userData.spendingAccounts);
    } else if (type === 'spendingCategories') {
      userData.spendingCategories.active.push(category);
      setSpendingCategories(userData.spendingCategories);
    }

    // write updated data back to the database
    await updateDoc(userRef, {
      incomeCategories: userData.incomeCategories,
      spendingCategories: userData.spendingCategories,
      spendingAccounts: userData.spendingAccounts,
    });

    // reset the input field
    setCategory('');
  };

  return (
    <form onSubmit={handleAddCategory}>
      <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  )
}
