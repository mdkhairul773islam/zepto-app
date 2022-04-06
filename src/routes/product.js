import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

import Unit from "../secure/Product/unit";
import Brand from "../secure/Product/brand";
import Category from "../secure/Product/category";
import AddProduct from "../secure/Product/add";
import AllProduct from "../secure/Product/index";
import ProductDetails from "../secure/Product/show";
import ProductEdit from "../secure/Product/edit";

const Product = [
    <ProtectedRoute path="/product/all" component={AllProduct} key="all" />,
    <ProtectedRoute path="/product/add" component={AddProduct} key="add" />,
    <ProtectedRoute path="/product/category" component={Category} key="category" />,
    <ProtectedRoute path="/product/brand" component={Brand} key="brand" />,
    <ProtectedRoute path="/product/unit" component={Unit} key="unit" />,
    <ProtectedRoute
        path="/product/view/:id"
        component={ProductDetails}
        key="show"
    />,
    <ProtectedRoute
        path="/product/edit/:id"
        component={ProductEdit}
        key="edit"
    />,
];

export default Product;