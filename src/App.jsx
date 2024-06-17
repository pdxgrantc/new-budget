import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import PropTypes from "prop-types";

// Pages
import Dashboard from './pages/Dashboard'
import Header from './utility/Header';

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

  return (
    <div>
      <header>
        <Header />
      </header>
      <main>{children || <Outlet />}</main>
      <p>Test</p>
    </div>
  )
}

Root.propTypes = {
  children: PropTypes.node
}
