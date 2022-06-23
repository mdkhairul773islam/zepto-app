import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <ul>
      <li>
        <NavLink
          to="/purchase/add"
          className={isActive =>
            (isActive ? "active" : "")
          }
        >New Purchase</NavLink>
      </li>
      <li>
        <NavLink
          to="/purchase/all"
          className={isActive =>
            (isActive ? "active" : "")
          }
        >
          All Purchase
        </NavLink>
      </li>
    </ul>
  );
}

export default Navbar;
