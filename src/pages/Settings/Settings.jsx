import { useEffect, useState } from "react"

// firebase
import { auth, db } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

// Components
import CategoryDisplay from "./CategoryDisplay";

// Helper functions
import { handleAddIncomeCategory, handleAddSpendingCategory, handleAddSpendingAccount } from "./addCategoryHelper";

export default function Settings() {
  return (
    <>
      <ChangeCategories />
    </>
  )
}

function ChangeCategories() {
  const [user] = useAuthState(auth);

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
        <CategoryDisplay categories={incomeCategories} addCategory={handleAddIncomeCategory} />
      </div>
      <div>
        <div>Accounts</div>
        <CategoryDisplay categories={spendingCategories} addCategory={handleAddSpendingCategory} />
      </div>
      <div>
        <div>Spending Categories</div>
        <CategoryDisplay categories={spendingAccounts} addCategory={handleAddSpendingAccount} />
      </div>
    </div>
  )
}
