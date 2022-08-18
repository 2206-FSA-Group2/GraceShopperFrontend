import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { getAllCategories, getAllProducts, addProductToCart } from "../../api";

import FilterBox from "./FilterBox";

import Pagination from "../Pagination/Pagination";

const Products = (props) => {
  const {categoriesData, setCategoriesData, productsData, setProductsData, searchProduct, setSearchProduct, stateRefresh, setStateRefresh} = props

  const [cartProduct, setCartProduct] = useState(null)
  let selectedProduct={};

  async function addItemToCart(event) {
    try {
    event.preventDefault();
    console.log("cart items before add",localStorage.getItem("cartItems"))
    if(await addProductToCart(selectedProduct)) alert("Added product to cart")
    console.log("cart items after add", localStorage.getItem("cartItems"))
    console.log(selectedProduct.id);
    } catch(error) {throw error}
  }


  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = productsData.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(productsData.length / recordsPerPage);

  
  
  return (
    <div className="productsdiv">
      <FilterBox  setCurrentPage={setCurrentPage} categoriesData={categoriesData} searchProduct={searchProduct} setSearchProduct={setSearchProduct} productsData={productsData} setProductsData={setProductsData} stateRefresh={stateRefresh} setStateRefresh={setStateRefresh}/>
      <section className="items">
        {currentRecords.map((product, idx) => {
          return (
            <div className="item rounded border" key={idx}>
            <Link to={`/products/${product.id}`} state={{ product: product }} className="item-name" style={{textDecoration:"none"}}>
                <span>{product.name}</span>
                <button
                  className="btn bi bi-cart-plus btn-primary btn-sm"
                  onMouseDown={(e)=>{e.preventDefault();selectedProduct=product}}
                  onClick={addItemToCart}
                ></button>
              </Link>
              {
                product.photos.length > 0 ?
              <Link to={`/products/${product.id}`} state={{ product: product }}>
                <img
                  className="item-image"
                  src={product.photos[0].url}
                  alt="product-name"
                  style={{ cursor: "pointer" }}
                  width="250"
                  height="200"
                />
              </Link> : <img className="item-image" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"} width="250" height="200"/>
            }
              <hr></hr>
              <div className="d-flex justify-content-between align-items-center">
                <div className="ratings">
                  <i className="fa fa-star rating-color"></i>
                  <i className="fa fa-star rating-color"></i>
                  <i className="fa fa-star rating-color"></i>
                  <i className="fa fa-star rating-color"></i>
                  <i className="fa fa-star"></i>
                </div>
                <h5 className="review-count">12 Reviews</h5>
              </div>
              <p className="item-description">{product.description}</p>
              <small className="text-muted">Items on stock: {product.quantity_on_hand}</small>
              <div className="fact-line">
                <span className="fact-name">${product.price}</span>
              </div>
            </div>
          );
        })}
        {
          productsData.length > 10 ? (<Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        />
        )
        : null
      
        }

      </section>
    </div>
  );
};

export default Products;
