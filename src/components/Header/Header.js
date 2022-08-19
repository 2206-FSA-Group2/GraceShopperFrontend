import React from "react"
import NavBar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";


const Header = (props) => {
    const {setProductsData, productsData, setSearchProduct, searchProduct, stateRefresh, setStateRefresh, categoriesData, unfilteredProducts, isUserAdmin, setIsUserAdmin} = props
    return (
        <>
        <SearchForm unfilteredProducts={unfilteredProducts} searchProduct={searchProduct} setSearchProduct={setSearchProduct} setProductsData={setProductsData} productsData={productsData}/>
        <NavBar setIsUserAdmin={setIsUserAdmin} isUserAdmin={isUserAdmin} stateRefresh={stateRefresh} setStateRefresh={setStateRefresh} categoriesData={categoriesData}/>
        </>
    )
}

export default Header;