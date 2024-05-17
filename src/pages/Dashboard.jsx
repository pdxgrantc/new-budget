import { useSelector, useDispatch } from 'react-redux'

export default function Dashboard() {
    return (
        <div>
            <PrintUserState />
        </div>
    )
}

function PrintUserState() {
    const user = useSelector((state) => state.user)

    const LogData = () => {
        console.log(user)
    }

    return (
        <div>
            <button onClick={LogData}>Log Data</button>
        </div>
    )
}
