import React from "react";

import ProtectedRoute from "../components/ProtectedRoute";
import NewItem from "../backend/Purchase/add";
import Index from "../backend/Purchase/index";
import Invoice from "../backend/Purchase/invoice";
import Edit from "../backend/Purchase/edit";

const Purchase = [
  <ProtectedRoute path="/purchase/add" component={NewItem} key="new" />,
  <ProtectedRoute
    path="/purchase/invoice/:invoice"
    component={Invoice}
    key="invoice"
  />,
  <ProtectedRoute path="/purchase/edit/:id" component={Edit} key="edit" />,
  <ProtectedRoute path="/purchase" component={Index} key="index" />,
];

export default Purchase;
