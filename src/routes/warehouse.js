import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

import AddWarehouse from "../backend/Warehouse/add";
import AllWarehouse from "../backend/Warehouse/index";
import WarehouseEdit from "../backend/Warehouse/edit";

const Warehouse = [
  <ProtectedRoute path="/warehouse/all" component={AllWarehouse} key="all" />,
  <ProtectedRoute path="/warehouse/add" component={AddWarehouse} key="add" />,

  <ProtectedRoute
    path="/warehouse/edit/:id"
    component={WarehouseEdit}
    key="edit"
  />,
];

export default Warehouse;
