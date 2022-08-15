import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login/Login";
import RegisterUser from "./Register/RegisterUser";
import Profile from "./Profile/Profile";

import Products from "./ProductsPage/Products";
import SingleProduct from "./ProductsPage/SingleProduct";



const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/register" element={<RegisterUser/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/:productId" element={<SingleProduct/>}/>
        </Routes>
        </BrowserRouter>
        
        

    )
}

export default App;