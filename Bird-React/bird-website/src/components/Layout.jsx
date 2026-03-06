import { Link } from "react-router-dom";
import "./Layout.css";
import logo from "../assets/logo.png";

function Layout({ children }) {
  return (
    <div className="main-box">

      <div className="top-green-bar">
        <div className="logo-circle">
          <img src={logo} alt="logo" />
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/add-species">Add Species</Link>
          <Link to="/table">Table</Link>
          <Link to="/add-image">Add Image</Link>
          <Link to="/detection">Detection IA</Link>
        </div>
      </div>

      <div className="layout-body">
        {children}
      </div>

    </div>
  );
}

export default Layout;