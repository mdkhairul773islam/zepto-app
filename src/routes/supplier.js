import React from "react";

import ProtectedRoute from "../components/ProtectedRoute";

import AddSupplier from "../backend/Supplier/add";
import AllSupplier from "../backend/Supplier/index";
import SupplierDetails from "../backend/Supplier/show";
import SupplierEdit from "../backend/Supplier/edit";
import AddTransaction from "../backend/Supplier/addTransaction";
import TransactionHistory from "../backend/Supplier/transactionHistory";
import Invoice from "../backend/Supplier/invoice";
import TransactionEdit from "../backend/Supplier/transactionEdit";

const Supplier = [
  <ProtectedRoute path="/supplier/all" component={AllSupplier} key="all" />,
  <ProtectedRoute path="/supplier/add" component={AddSupplier} key="add" />,
  <ProtectedRoute
    path="/supplier/add-transaction"
    component={AddTransaction}
    key="addTransaction"
  />,
  <ProtectedRoute
    path="/supplier/transaction-histrory"
    component={TransactionHistory}
    key="transactionHistory"
  />,

  <ProtectedRoute
    path="/supplier/view/:id"
    component={SupplierDetails}
    key="show"
  />,
  <ProtectedRoute
    path="/supplier/edit/:id"
    component={SupplierEdit}
    key="edit"
  />,

  <ProtectedRoute
    path="/supplier/transaction-invoice/:id"
    component={Invoice}
    key="show"
  />,
  <ProtectedRoute
    path="/supplier/transaction-edit/:id"
    component={TransactionEdit}
    key="transactionEdit"
  />,
];

export default Supplier;
