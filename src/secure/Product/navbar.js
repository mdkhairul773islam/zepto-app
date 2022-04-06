import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <ul>
      <li>
        <NavLink
          to="/product/add"
          className={(isActive) => (isActive ? "active" : "")}
        >
          Add Product
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/product/all"
          className={(isActive) => (isActive ? "active" : "")}
        >
          All Product
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/product/category"
          className={(isActive) => (isActive ? "active" : "")}
        >
          Category
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/product/brand"
          className={(isActive) => (isActive ? "active" : "")}
        >
          Brand
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/product/unit"
          className={(isActive) => (isActive ? "active" : "")}
        >
          Unit
        </NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
