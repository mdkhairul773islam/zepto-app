import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

import Unit from "../backend/Product/unit";
import Brand from "../backend/Product/brand";
import Category from "../backend/Product/category";
import AddProduct from "../backend/Product/add";
import AllProduct from "../backend/Product/index";
import ProductDetails from "../backend/Product/show";
import ProductEdit from "../backend/Product/edit";

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