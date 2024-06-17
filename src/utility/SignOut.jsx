import {SignOutWithFirebase} from '../firebase';


export default function SignOut({ children }) {
    return (
        <button onClick={SignOutWithFirebase}>
            {children}
        </button>
    )
}