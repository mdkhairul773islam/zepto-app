import React from "react";
import { Route } from "react-router-dom";

function FrontendRoute({ component: Component, ...restOfProps }) {
  return (
    <Route {...restOfProps} render={(props) => <Component {...props} />} />
  );
}

export default FrontendRoute;
