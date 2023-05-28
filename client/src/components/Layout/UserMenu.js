import React from "react";
import "../../style/AdminMenu.css";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="custom-ol">
        <ol>
          <NavLink to="/dashboard/user/profile">
            <li>Profile</li>
          </NavLink>
          <NavLink to="/dashboard/user/orders">
            <li>Orders</li>
          </NavLink>
        </ol>
      </div>
    </div>
  );
};

export default UserMenu;
