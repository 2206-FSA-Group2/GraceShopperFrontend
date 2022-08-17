import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../api";

const CarouselCards = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getAllProducts();
      setProductsData(data);
    }
    getData();
  }, []);

  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="cards-wrapper" style={{ display: "flex" }}>
            {productsData.slice(0,3).map((products, idx) => {
              return (
                <div
                  className="card"
                  style={{ width: "33%", margin: "0 0.5em", height: "350px" }}
                >
                  <img
                    src={products.photos[0].url}
                    className="card-img-top"
                    alt="img1"
                    height="225px"
                  ></img>
                  <div className="card-body">
                    <h5 className="card-title">{products.name}</h5>
                    <p className="card-text">{products.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="carousel-item">
          <div className="cards-wrapper" style={{ display: "flex" }}>
            {productsData.slice(15, 18).map((products, idx) => {
              return (
                <div
                  className="card"
                  style={{ width: "33%", margin: "0 0.5em", height: "350px" }}
                >
                  <img
                    src={products.photos[0].url}
                    className="card-img-top"
                    alt="img1"
                    height="225px"
                  ></img>
                  <div className="card-body">
                    <h5 className="card-title">{products.name}</h5>
                    <p className="card-text">{products.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="carousel-item">
          <div className="cards-wrapper" style={{ display: "flex" }}>
            {productsData.slice(10, 13).map((products, idx) => {
              return (
                <div
                  className="card"
                  style={{ width: "33%", margin: "0 0.5em", height: "350px" }}
                >
                  <img
                    src={products.photos[0].url}
                    className="card-img-top"
                    alt="img1"
                    height="225px"
                  ></img>
                  <div className="card-body">
                    <h5 className="card-title">{products.name}</h5>
                    <p className="card-text">{products.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselCards;
