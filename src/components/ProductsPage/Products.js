import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllProducts } from "../../api";
import FilterBox from "./FilterBox";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  console.log(productsData);

  function addItemToCart() {
    console.log("Added item");
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
            <div className="item" key={idx}>
              <h3 className="item-name">
                <span>{product.name}</span>
                <button
                  className="btn bi bi-cart-plus"
                  onClick={addItemToCart}
                ></button>
              </h3>
              <Link to={`/products/${product.id}`} state={{ product: product}}>
                <img
                  className="item-image"
                  src={product.photos[0].url}
                  alt="product-name"
                  style={{ cursor: "pointer" }}
                />
              </Link>

              <p className="item-description">{product.description}</p>
              <p className="fact-line">
                <span className="fact-name">Price:</span>
                <span>${product.price}</span>
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Products;
