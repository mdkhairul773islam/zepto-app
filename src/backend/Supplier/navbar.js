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
      <li>
        <NavLink
          to="/supplier/new-transaction"
          className={(isActive) => (isActive ? "active" : "")}
        >
          New Transaction
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/supplier/all-transaction"
          className={(isActive) => (isActive ? "active" : "")}
        >
          All Transaction
        </NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
