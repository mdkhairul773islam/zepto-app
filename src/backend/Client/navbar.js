import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <ul>
      <li>
        <NavLink
          to="/client/add"
          className={(isActive) => (isActive ? "active" : "")}
        >
          Add Client
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/client/all"
          className={(isActive) => (isActive ? "active" : "")}
        >
          All Client
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/client/new-transaction"
          className={(isActive) => (isActive ? "active" : "")}
        >
          New Transaction
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/client/all-transaction"
          className={(isActive) => (isActive ? "active" : "")}
        >
          All Transaction
        </NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
