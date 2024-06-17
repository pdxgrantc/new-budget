import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Header() {
    const [user] = useAuthState(auth);

    return (
        <div>
            <div>Header</div>
            <img src={user?.photoURL} alt={user?.displayName} />
        </div>
    )
}
