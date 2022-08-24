import React, {useState, useEffect} from "react";
import { getAllCategories } from "../../api";

const FilterBox = (props) => {
  const {categoriesData, productsData, setProductsData, searchProduct, setSearchProduct, stateRefresh, setStateRefresh, setCurrentPage, featuredProducts} = props

  async function handleClickCategory(event){
    setCurrentPage(1)
    const categoryClicked = event.target.value
    document.getElementById("searchFormInput").value = categoryClicked
    document.getElementById("searchFormButton").click();
  }

  async function showAllProducts(){
    document.getElementById("searchFormInput").value = ""
    document.getElementById("searchFormButton").click();
    setSearchProduct(searchProduct + 1)
  }

  async function filterByHighPrice(){
    setCurrentPage(1)
    const orderedData = productsData.sort((a, b) => parseFloat(Number(b.price)) - parseFloat(Number(a.price)))
    setProductsData(orderedData)
    setStateRefresh(stateRefresh + 1)    
  }

  async function filterByLowPrice(){
    setCurrentPage(1)
    const orderedData = productsData.sort((a, b) => parseFloat(Number(a.price)) - parseFloat(Number(b.price)))
    setProductsData(orderedData)
    setStateRefresh(stateRefresh + 1)   
  }

  async function showBestRated(){
    setCurrentPage(1)
    setProductsData(featuredProducts)
    setStateRefresh(stateRefresh + 1)
  }
  
  return (
    <form>
  <div className="checkboxes filterbox">
  <label style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Filter Results</label>
  <label style={{textAlign: "left", fontSize: "14px", fontWeight: "bold"}}>By Price:</label>
    <label><input type="radio" name="filterby" onClick={filterByHighPrice}/> <span>Descending price</span></label>
    <label><input type="radio" name="filterby" onClick={filterByLowPrice}/> <span>Ascending price</span></label>
    <label style={{textAlign: "left", fontSize: "14px", fontWeight: "bold"}}>By Category:</label>
    {
      categoriesData.map((category, idx)=>{return(
        <label key={idx}><input type="radio" name="filterby" value={category.name} onChange={handleClickCategory} /> <span>{category.name}</span></label>
      )})
    }

    <label style={{textAlign: "left", fontSize: "14px", fontWeight: "bold"}}>By Ratings:</label>
    <label onClick={showBestRated}><input type="radio" name="filterby"/> <span>Featured Products</span></label>
    <label style={{textAlign: "left", fontSize: "14px", fontWeight: "bold"}}>By Availability:</label>
    <label><input type="radio" name="filterby" onClick={showAllProducts}/> <span>All products</span></label>
  </div>
</form>
  );
};

export default FilterBox;
