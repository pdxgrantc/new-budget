import SignIn from "../utility/SignIn"
import SignOut from "../utility/SignOut"

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
      <div>Dashboard Test</div>
    </div>
  )
}
