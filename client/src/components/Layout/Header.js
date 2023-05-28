import React from "react";
import "../../style/Header.css";
import toast from "react-hot-toast";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully", { duration: 4000 });
  };
  return (
    <>
      <header className="header">
        <nav className="navbar">
          <Link className="brand" to="/">
            <img src="./images/navLogo.png" alt="navLogo" />
          </Link>
          <input type="checkbox" id="nav" className="hidden" />
          <label htmlFor="nav" className="nav-toggle">
            <span />
            <span />
            <span />
          </label>
          <div className="wrapper">
            <ul className="menu">
              <li className="menu-item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="menu-item">
                <NavLink to="/category">Category</NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className="menu-item">
                    <NavLink to="/signup">Sign Up</NavLink>
                  </li>
                  <li className="menu-item">
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="menu-item parent">
                    <NavLink to="">{auth?.user?.name}</NavLink>
                    {/* Haadi starts */}
                    <ul className="child">
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                      <br />
                      <NavLink onClick={handleLogout} to="/login">
                        Logout
                      </NavLink>
                    </ul>
                    {/* Haadi starts */}
                  </li>
                </>
              )}

              <li className="menu-item parent">
                <NavLink to="/cart">Cart(0)</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
