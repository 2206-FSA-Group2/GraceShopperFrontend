import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./ProductsPage/Products";
import SingleProduct from "./ProductsPage/SingleProduct";


const App = () => {
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:productId" element={<SingleProduct/>}/>
        </Routes>
        </BrowserRouter>
        
    )
}

export default App;