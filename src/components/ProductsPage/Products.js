import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllProducts, addProductToCart} from "../../api";
import FilterBox from "./FilterBox";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [cartProduct, setCartProduct] = useState(null)
  let selectedProduct={};

  async function addItemToCart(event) {
    try {
    event.preventDefault();
    console.log("cart items before add",localStorage.getItem("cartItems"))
    if(await addProductToCart(selectedProduct)) alert("Added product to cart")
    else alert("Sorry, that product is unavailable")
    console.log("cart items after add", localStorage.getItem("cartItems"))
    console.log(selectedProduct.id);
    } catch(error) {throw error}
  }

  useEffect(() => {
    async function getData() {
      const data = await getAllProducts();
      setProductsData(data);
    }
    getData();
  }, []);

  
  return (
    <div className="productsdiv">
      <FilterBox />
      <section className="items">
        {productsData.map((product, idx) => {
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
              <Link to={`/products/${product.id}`} state={{ product: product }}>
                <img
                  className="item-image"
                  src={product.photos[0].url}
                  alt="product-name"
                  style={{ cursor: "pointer" }}
                  width="250"
                  height="200"
                />
              </Link>
              <hr></hr>
              <div class="d-flex justify-content-between align-items-center">
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
      </section>
    </div>
  );
};

export default Products;
