import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login/Login";
import RegisterUser from "./Register/RegisterUser";
import Profile from "./Profile/Profile";

import Products from "./ProductsPage/Products";
import SingleProduct from "./ProductsPage/SingleProduct";
import Homepage from "./Homepage/Homepage";

import AdminProducts from "./AdminPage/AdminProducts/AdminProducts";
import SingleAdminProduct from "./AdminPage/AdminProducts/SingleAdminProduct";


const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/register" element={<RegisterUser/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/:productId" element={<SingleProduct/>}/>
            <Route path="/admin/products" element={<AdminProducts />}/>
            <Route path="/admin/products/:productId" element={<SingleAdminProduct />}/>
        </Routes>
        </BrowserRouter>
        
        

    )
}

export default App;