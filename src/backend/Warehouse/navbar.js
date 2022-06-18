import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <ul>
      <li>
        <NavLink
          to="/warehouse/add"
          className={(isActive) => (isActive ? "active" : "")}
        >
          Add Warehouse
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/warehouse/all"
          className={(isActive) => (isActive ? "active" : "")}
        >
          All Warehouse
        </NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
