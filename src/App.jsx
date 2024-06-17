import { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link, NavLink } from 'react-router-dom'
import PropTypes from "prop-types";

// Firebase
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// Utility
import SignIn from './utility/SignIn';
import SignOut from './utility/SignOut';

// Pages
import Dashboard from './pages/Dashboard'
import Header from './utility/Header';

// icons
import { SiGithub as GitHubLogo } from "react-icons/si";
import { FaLinkedinIn as LinkedLogo } from "react-icons/fa";
import { IoPersonCircleSharp as AboutLogo } from "react-icons/io5";
import { IoMenu as MenuIcon } from "react-icons/io5";

// Images
import google_normal from "./assets/btn_google_signin_dark_normal_web@2x.png";
import google_pressed from "./assets/btn_google_signin_dark_pressed_web@2x.png";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} caseSensitive={true}>
          <Route index element={<Dashboard />} />
          <Route path="/income" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function Root(props) {
  const { children } = props;
  const [user] = useAuthState(auth);

  return (
    <div className="text bg-black min-h-screen w-full">
      <NavBarHost />
      <div>
        {user ? (
          <div
            className="bg h-full flex-grow on_desktop:px-20 on_mobile:px-[3vw] pb-10"
            style={{ minHeight: "calc(100vh - 17.5rem)" }}
          >
            <main>{children || <Outlet />}</main>
          </div>
        ) : (
          <div
            className="bg h-full flex-grow px-20 py-10"
            style={{
              minHeight: "calc(100vh - 17.5rem)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SignInDialogue />
          </div>
        )}
      </div>

      <footer className="bg-black px-20 h-[12.5rem] flex justify-around flex-col">
        <div className="flex flex-col gap-2">
          <p className="mx-auto">Find me here</p>
          <div className="flex gap-6 w-fit mx-auto">
            <OutsideLink className="" link="https://www.github.com/pdxgrantc">
              <GitHubLogo className="h-[3.25rem] w-auto mx-auto text-button hover:text-button_hover" />
            </OutsideLink>
            <OutsideLink link="https://pdxgrantc.com/">
              <AboutLogo className="h-[3.5rem] w-auto text-button hover:text-button_hover" />
            </OutsideLink>
            <OutsideLink link="https://www.linkedin.com/in/pdxgrantc">
              <LinkedLogo className="h-[3.5rem] w-auto text-button hover:text-button_hover" />
            </OutsideLink>
          </div>
          <p className="mx-auto text-m">Grant Conklin - 2024</p>
        </div>
      </footer>
    </div>
  );
}

Root.propTypes = {
  children: PropTypes.node
}

function NavBarHost() {
  return (
    <div>
      <div className="on_desktop:hidden">
        <MobileNavBar />
      </div>
      <div className="on_mobile:hidden">
        <DesktopNavBar />
      </div>
    </div>
  );
}

function SignInDialogue() {
  const GoogleButton = () => {
    const handleMouseEnter = (event) => {
      // Change the source of the image to the second image
      event.target.src = google_pressed;
    };

    const handleMouseLeave = (event) => {
      // Change the source of the image back to the first image
      event.target.src = google_normal;
    };

    return (
      <SignIn>
        <div className="mx-auto transition rounded">
          <img
            src={google_normal}
            alt="Button"
            className="h-[5rem]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </SignIn>
    );
  };

  return (
    <div className="my-auto">
      <div className="center flex flex-col gap-5 h-fit w-fit mx-auto">
        <div className="flex flex-col gap-2 w-fit">
          <h1 className="text-center text-5xl font-bold">
            Welcome to Easy Budget
          </h1>
          <p className="text-center text-2xl">
            Please sign in with Google to continue
          </p>
        </div>
        <div className="font-semibold mx-auto w-fit">
          <GoogleButton />
        </div>
      </div>
    </div>
  );
}

const OutsideLink = ({ children, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="buttons center w-fit flex gap-3 mt-1 hover:text-white hover:mt-0 hover:mb-1 font-semibold transition-all durration-300 ease-in-out"
    >
      {children}
    </a>
  );
};

OutsideLink.propTypes = {
  children: PropTypes.node,
  link: PropTypes.string,
};

function DesktopNavBar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="h-20 bg-black px-20 flex flex-wrap items-center justify-between">
      <Link to="/">
        <h1 className="text-lheader font-semibold on_mobile:hidden">
          Easy Budget
        </h1>
      </Link>
      <ul
        className="flex gap-5 text-subheader font-semibold mb-2"
        style={{ alignSelf: "flex-end" }}
      >
        {user && (
          <>
            <li className="custom-button">
              <NavLink to="/">Dashboard</NavLink>
            </li>
            <li className="custom-button">
              <NavLink to="/income">Income</NavLink>
            </li>
            <li className="custom-button">
              <NavLink to="/spending">Spending</NavLink>
            </li>
            <li className="custom-button">
              <NavLink to="/settings">Settings</NavLink>
            </li>
          </>
        )}
        <li className="custom-button">
          {!user ? (
            <SignIn>
              <p>Sign In</p>
            </SignIn>
          ) : (
            <SignOut>
              <div className="flex gap-4">
                <p>Sign Out</p>
                <img
                  src={user?.photoURL}
                  alt="User"
                  className="h-10 w-10 rounded-full my-auto"
                />
              </div>
            </SignOut>
          )}
        </li>
        {user && <li></li>}
      </ul>
    </nav>
  );
}

function MobileNavBar() {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    setMenuOpen(false);
    SignOut();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="on_mobile:text-mobile h-20 bg-black px-[3vw] flex flex-wrap items-center justify-between relative">
        <Link to="/">
          <h1 className="text-lheader font-semibold">EB</h1>
        </Link>
        {user ? (
          <button
            className="h-full"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <MenuIcon
              className={`hover:text-white h-4/5 w-auto ${menuOpen ? "text-white" : ""
                }`}
            />
          </button>
        ) : (
          <SignIn>
            <div className="h-full" >
              <p>Sign In</p>
            </div>
          </SignIn>
        )}
      </nav>
      {menuOpen && (
        <div className="absolute right-[3vw] bg-menuBG text rounded w-fit p-3">
          <DropdownMenu>
            <MenuItem onClick={closeMenu}>
              <Link to="/">Dashboard</Link>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
              <Link to="/income">Income</Link>
            </MenuItem>
            <MenuItem onClick={closeMenu}>
              <Link to="/spending">Spending</Link>
            </MenuItem>
            <MenuItem>
              <button onClick={handleSignOut}>Sign Out</button>
            </MenuItem>
          </DropdownMenu>
        </div>
      )}
    </>
  );
}
