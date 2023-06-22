import React from "react";
import "../../style/Header.css";
import toast from "react-hot-toast";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import SearchInput from "../Forms/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully", { duration: 4000 });
  };
  //Badge Styling
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -9,
      top: 5,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <>
      <header className="header">
        <nav className="navbar">
          <Link className="brand" to="/">
            <img src="/images/navLogo.png" alt="navLogo" />
          </Link>
          <input type="checkbox" id="nav" className="hidden" />
          <label htmlFor="nav" className="nav-toggle">
            <span />
            <span />
            <span />
          </label>
          <SearchInput />
          <div className="wrapper">
            <ul className="menu">
              <li className="menu-item">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="menu-item parent">
                <NavLink to="/categories">Category</NavLink>
                {/* changes starts */}
                <ul className="child">
                  <NavLink to="/categories">All Category</NavLink>
                  {categories?.map((c) => (
                    <div key={c.name}>
                      <NavLink to={`/category/${c.name}`}>{c.name}</NavLink>
                    </div>
                  ))}
                </ul>

                {/* changes ends */}
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
                    {/* changes starts */}
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
                    {/* changes ends */}
                  </li>
                </>
              )}

              <li className="menu-item parent">
                {/* <NavLink to="/cart">Cart {cart?.length}</NavLink> */}
                <NavLink to="/cart">
                  <StyledBadge badgeContent={cart?.length} color="primary">
                    Cart
                  </StyledBadge>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
