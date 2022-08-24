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
      style={{ width:"66%", margin: "0 auto" }}
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="cards-wrapper" style={{ display: "flex"}}>
            {productsData.slice(1,4).map((products, idx) => {
              return (
                <div
                key={idx}
                  style={{ width: "33%", margin: "0 0.5em" }}
                  className="card"
                >
                  <img
                    src={products.photos[0].url}
                    className="card-img-top rounded"
                    alt="img1"
                    height="200px"
                  ></img>
                </div>
              );
            })}
          </div>
        </div>
        <div className="carousel-item">
          <div className="cards-wrapper" style={{ display: "flex" }}>
            {productsData.slice(21, 24).map((products, idx) => {
              return (
                <div
                key={idx}
                  style={{ width: "33%", margin: "0 0.5em"}}
                >
                  <img
                    src={products.photos[0].url}
                    className="card-img-top rounded"
                    alt="img1"
                    height="200px"
                  ></img>

                </div>
              );
            })}
          </div>
        </div>
        <div className="carousel-item">
          <div className="cards-wrapper" style={{ display: "flex" }}>
            {productsData.slice(31, 34).map((products, idx) => {
              return (
                <div
                key={idx}
                  style={{ width: "33%", margin: "0 0.5em" }}
                >
                  <img
                    src={products.photos[0].url}
                    className="card-img-top rounded"
                    alt="img1"
                    height="200px"
                  ></img>

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
