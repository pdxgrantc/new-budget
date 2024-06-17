import SignIn from "../utility/SignIn"
import SignOut from "../utility/SignOut"

import userSlice from "../../redux/userSlice"
import { useSelector } from 'react-redux';

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <div>
        <SignIn>
          Ding Dong MOTHAFUCKA
        </SignIn>
      </div>
      <div>
        <SignOut>
          Goodbye MOTHAFUCKA
        </SignOut>
      </div>
      <PrintUserSlice />
    </div>
  )
}

function PrintUserSlice() {
  // Use useSelector hook to access the state managed by userSlice
  const userState = useSelector((state) => state.user);

  // Function to log the userSlice state to the console
  const printUserSliceToConsole = () => {
    console.log(userState);
  };

  return (
    <div>
      <button onClick={printUserSliceToConsole}>Print To Console</button>
    </div>
  );
}