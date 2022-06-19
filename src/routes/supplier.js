import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

import AddSupplier from "../backend/Supplier/add";
import AllSupplier from "../backend/Supplier/index";
import SupplierEdit from "../backend/Supplier/edit";
import SupplierDetails from "../backend/Supplier/details";

const Supplier = [
    <ProtectedRoute path="/supplier/all" component={AllSupplier} key="all" />,
    <ProtectedRoute path="/supplier/add" component={AddSupplier} key="add" />,

    <ProtectedRoute
        path="/supplier/edit/:id"
        component={SupplierEdit}
        key="edit"
    />,

    <ProtectedRoute
        path="/supplier/details/:id"
        component={SupplierDetails}
        key="details"
    />,
];

export default Supplier;
