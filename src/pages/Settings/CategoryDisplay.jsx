import { useState } from "react"

// firebase
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth";

// Icons
import { CgAdd as AddIcon } from "react-icons/cg";

export default function spendingCategories({ categories, addCategory }) {
    const [user] = useAuthState(auth);
    const [category, setCategory] = useState('')

    return (
        <>
            <div>
                {categories?.active.map((category) => {
                    return <div key={category}>{category}</div>
                })}
            </div>
            <div className='flex gap-2'>
                <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
                <button onClick={() => addCategory(user, category)} className="custom-button">
                    <AddIcon className='h-15 w-auto' />
                </button>
            </div>
        </>
    )
}
