import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import EachReview from "./EachReview";
import { addProductToCart } from "../../api";

const SingleProduct = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state;


  const { categories, description, name, photos, price, quantity_on_hand, reviews } =
    product;


  function change_image(event) {
    let container = document.getElementById("main-image");
    container.src = event.target.src
  }

  let selectedProduct={};
  async function handleAddItem(event){
    try {
      event.preventDefault();
      if(await addProductToCart(selectedProduct)) alert("Added product to cart")
      else alert("Sorry, that product is unavailable")
      } catch(error) {throw error}
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="row">
              <div className="col-md-6">
                <div className="images p-3">
                  <div className="text-center p-4">
                    <img id="main-image" src={photos[0].url} width="250" height="250" />
                  </div>
                  <div className="thumbnail text-center">
                  {
                    photos.map((photo, idx)=>{return (
                        <img
                      onClick={change_image}
                      src={photo.url}
                      width="70"
                      key={idx}
                      style={{ cursor: "pointer" }}
                    />
                    )})
                  }
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="product p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center" onClick={()=>{navigate(-1)}} style={{ cursor: "pointer" }}>
                      <i className="fa fa-long-arrow-left"></i>
                      <span className="ml-1">Back</span>
                    </div>
                    <i className="fa fa-shopping-cart text-muted"></i>
                  </div>
                  <div className="mt-4 mb-3">
                    <h5 className="text-uppercase">{name}</h5>
                    <div className="price d-flex flex-row align-items-center">
                      <span className="act-price" style={{fontWeight: "bold"}}>${price}</span>
                    </div>
                  </div>
                  <p className="about">{description}</p>
                  <span className="text-muted ">
                    Items on stock: {quantity_on_hand}
                  </span>
                  <div className="cart mt-4 align-items-center">
                    <button className="btn btn-success text-uppercase mr-2 px-4" style={{margingTop: "2rem"}} onClick={handleAddItem} onMouseDown={(e)=>{e.preventDefault();selectedProduct=product}}>
                      Add to cart
                    </button>
                    <i className="fa fa-heart text-muted" style={{padding: ".5rem"}}></i>
                    <i className="fa fa-share-alt text-muted"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EachReview reviews={reviews} />
    </div>
  );
};

export default SingleProduct;
