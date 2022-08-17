import React from "react"
import NavBar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";


const Header = (props) => {
    const {setProductsData, productsData, setSearchProduct, searchProduct, stateRefresh, setStateRefresh, categoriesData, unfilteredProducts} = props
    return (
        <>
        <SearchForm unfilteredProducts={unfilteredProducts} searchProduct={searchProduct} setSearchProduct={setSearchProduct} setProductsData={setProductsData} productsData={productsData}/>
        <NavBar stateRefresh={stateRefresh} setStateRefresh={setStateRefresh} categoriesData={categoriesData}/>
        </>
    )
}

export default Header;