import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <ul>
      <li>
        <NavLink
          to="/supplier/add"
          className={(isActive) => (isActive ? "active" : "")}
        >
          Add Supplier
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/supplier/all"
          className={(isActive) => (isActive ? "active" : "")}
        >
          All Supplier
        </NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
