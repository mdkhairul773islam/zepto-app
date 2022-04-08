import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isLoggedin = useSelector((state) => state.authReducer.isLoggedin);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isLoggedin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
