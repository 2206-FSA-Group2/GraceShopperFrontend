import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
    Login,
    RegisterUser,
    Profile,
    Products,
    SingleProduct,
    Cart,
    AdminProducts,
    SingleAdminProduct,
    Homepage
} from "./"



const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/cart" element={<Cart />} />
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