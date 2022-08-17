import React, {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";

const SearchForm = (props) => {
    const {setProductsData, productsData, setSearchProduct, searchProduct, unfilteredProducts} = props
    
    let navigate = useNavigate();

    async function handleSubmit(event){
      event.preventDefault()
      const searchTerm = event.target[0].value.toLowerCase()
      findMyItems(searchTerm)
    }

    async function handleSearch(event){
        event.preventDefault()
        const searchTerm = event.target.value.toLowerCase()
        if (!searchTerm) setSearchProduct(searchProduct + 1);
        findMyItems(searchTerm)        
    }

    function findMyItems(searchTerm){
      function productMatches(product, text){
        if (product.name.toLowerCase().includes(text)){
            return true
        } else if (product.description.toLowerCase().includes(text)){
            return true;
        }  else if (JSON.stringify(product.categories).toLowerCase().includes(text)){
            return true
        } else {
            return false;
        }
    }
    const filteredProducts = unfilteredProducts.filter((product)=> productMatches(product, searchTerm))
    const productsToShow = searchTerm.length ? filteredProducts : productsData;
    setProductsData(productsToShow);
    if (productsToShow.length === 0){
        setSearchProduct(searchProduct + 1);
    }
    navigate("/products")        
    }

  return (
    <form className="navbar-dark bg-dark " onSubmit={handleSubmit}>
    <div className="input-group rounded " style={{ width: "33%", margin:"0 auto"}}>
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search products"
        aria-label="Search"
        aria-describedby="search-addon"
        id="searchFormInput"
        onChange={handleSearch}
      />
      <button className="input-group-text border-0" id="searchFormButton" type="submit">
        <i className="fas fa-search" ></i>
      </button>
    </div>
    </form>
  );
};

export default SearchForm;
