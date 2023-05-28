import React from "react";
import "../../style/AdminMenu.css";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div>
      <div className="custom-ol">
        <ol>
          <NavLink to="/dashboard/admin/create-category">
            <li>Create Catergory</li>
          </NavLink>
          <NavLink to="/dashboard/admin/create-product">
            <li>Create Product</li>
          </NavLink>
          <NavLink to="/dashboard/admin/users">
            <li>Users Details</li>
          </NavLink>
        </ol>
      </div>
    </div>
  );
};

export default AdminMenu;
