import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

import AddClient from "../backend/Client/add";
import AllClient from "../backend/Client/index";
import ClientEdit from "../backend/Client/edit";
import ClientDetails from "../backend/Client/details";

import NewTransaction from "../backend/Client/newTransaction";
import AllTransaction from "../backend/Client/allTransaction";
import EditTransaction from "../backend/Client/editTransaction";
import InvoiceTransaction from "../backend/Client/invoiceTransaction";

const Client = [
    <ProtectedRoute path="/client/all" component={AllClient} key="all" />,
    <ProtectedRoute path="/client/add" component={AddClient} key="add" />,

    <ProtectedRoute
        path="/client/edit/:id"
        component={ClientEdit}
        key="edit"
    />,

    <ProtectedRoute
        path="/client/details/:id"
        component={ClientDetails}
        key="details"
    />,


    <ProtectedRoute path="/client/all-transaction" component={AllTransaction} key="all-transaction" />,
    <ProtectedRoute path="/client/new-transaction" component={NewTransaction} key="new-transaction" />,

    <ProtectedRoute
        path="/client/transaction/edit/:id"
        component={EditTransaction}
        key="edit-transaction"
    />,

    <ProtectedRoute
        path="/client/transaction/invoice/:id"
        component={InvoiceTransaction}
        key="invoice-transaction"
    />,


];

export default Client;
