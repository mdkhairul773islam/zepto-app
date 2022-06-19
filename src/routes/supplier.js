import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

import AddSupplier from "../backend/Supplier/add";
import AllSupplier from "../backend/Supplier/index";
import SupplierEdit from "../backend/Supplier/edit";
import SupplierDetails from "../backend/Supplier/details";

import NewTransaction from "../backend/Supplier/newTransaction";
import AllTransaction from "../backend/Supplier/allTransaction";
import EditTransaction from "../backend/Supplier/editTransaction";
import InvoiceTransaction from "../backend/Supplier/invoiceTransaction";

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


    <ProtectedRoute path="/supplier/all-transaction" component={AllTransaction} key="all-transaction" />,
    <ProtectedRoute path="/supplier/new-transaction" component={NewTransaction} key="new-transaction" />,

    <ProtectedRoute
        path="/supplier/transaction/edit/:id"
        component={EditTransaction}
        key="edit-transaction"
    />,

    <ProtectedRoute
        path="/supplier/transaction/invoice/:id"
        component={InvoiceTransaction}
        key="invoice-transaction"
    />,


];

export default Supplier;
