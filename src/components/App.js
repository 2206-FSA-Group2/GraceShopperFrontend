import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getAllProducts, getAllCategories } from "../api";

import {
    Login,
    RegisterUser,
    Profile,
    Products,
    SingleProduct,
    Cart,
    AdminProducts,
    SingleAdminProduct,
    Homepage,
    AdminUsers,
    SingleAdminUser,
    Header
} from "./"



const App = () => {
    const [productsData, setProductsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([])
    const [searchProduct, setSearchProduct] = useState(0)
    const [stateRefresh, setStateRefresh] = useState(0)
    const [unfilteredProducts, setUnfilteredProducts] = useState([])

    useEffect(() => {
        async function getData() {
          const data = await getAllProducts();
          setProductsData(data);
          const _data = await getAllCategories();
          setCategoriesData(_data)
        }
        getData();
      }, [searchProduct]);

      useEffect(()=>{
        async function getProducts() {
            const newdata = await getAllProducts();
            setUnfilteredProducts(newdata)
          }
          getProducts();
      }, [])

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Header unfilteredProducts={unfilteredProducts} categoriesData={categoriesData} stateRefresh={stateRefresh} setStateRefresh={setStateRefresh} searchProduct={searchProduct} setSearchProduct={setSearchProduct} setProductsData={setProductsData} productsData={productsData}/>}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Homepage/>} />
            <Route path="/register" element={<RegisterUser/>} />
            <Route path="/login" element={<Login stateRefresh={stateRefresh} setStateRefresh={setStateRefresh}/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/products" element={<Products stateRefresh={stateRefresh} setStateRefresh={setStateRefresh} productsData={productsData} setProductsData={setProductsData} categoriesData={categoriesData} setCategoriesData={setCategoriesData} searchProduct={searchProduct} setSearchProduct={setSearchProduct}/>}/>
            <Route path="/products/:productId" element={<SingleProduct/>}/>
            <Route path="/admin/products" element={<AdminProducts />}/>
            <Route path="/admin/products/:productId" element={<SingleAdminProduct />}/>
            <Route path="/admin/users" element={<AdminUsers />}/>
            <Route path="/admin/users/:userId" element={<SingleAdminUser />}/>
            </Route>
        </Routes>
        </BrowserRouter>
        

    )
}

export default App;