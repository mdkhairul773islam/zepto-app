import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../secure/Dashboard/Dashboard";

export default (
  <ProtectedRoute exact path="/admin" component={Dashboard} key="dashboard" />
);
