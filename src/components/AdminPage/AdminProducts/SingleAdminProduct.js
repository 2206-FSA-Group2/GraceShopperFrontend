import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { deleteProduct, getsUserData, updateProduct } from "../../../api";
import UnauthorizedRoute from "../../ErrorPages/UnauthorizedRoute";

const SingleAdminProduct = () => {
  const user = localStorage.getItem("user")
  const isAdmin = JSON.parse(user)
  if (!isAdmin) return <UnauthorizedRoute/>
  let navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state;

  const { id, categories, description, name, photos, price, quantity_on_hand } =
    product;
  const token = localStorage.getItem("token");


  async function handleSubmitUpdateProduct(event) {
    event.preventDefault();
    let isActive = true
    const newName = event.target[0].value;
    const newDescription = event.target[1].value;
    const newPrice = event.target[2].value;
    const newStock = event.target[3].value;
    if (!newStock) isActive = false
    const updatedProduct = await updateProduct(
      id,
      newName,
      newDescription,
      newPrice,
      newStock,
      isActive,
      token
    );

    console.log(updatedProduct);
    navigate("/admin/products");
  }

  async function handleDeleteProduct(event) {
    event.preventDefault();
    const deletedProduct = await deleteProduct(id, token);
    console.log(deletedProduct);
    navigate("/admin/products");
  }

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Photos</th>
              <th scope="col">Price</th>
              <th scope="col">Items on Stock</th>
              <th scope="col">Categories</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{name}</th>
              <td> {description} </td>
              <td>
                {photos.map((photo) => {
                  return photo.url + " " ;
                })}
              </td>
              <td>{price}</td>
              <td>{quantity_on_hand}</td>
              <td>
                {categories.map((category) => {
                  return category.name;
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <form
          className="row g-3 justify-content-center"
          style={{ marginTop: "1rem" }}
          onSubmit={handleSubmitUpdateProduct}
        >
          <div className="col-auto ">
            <input
              type="text"
              className="form-control"
              id="inputtext1"
              placeholder="Name"
            />
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="inputtext2"
              placeholder="Description"
            />
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="inputtext3"
              placeholder="Price"
            />
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="inputtext4"
              placeholder="Items on Stock"
            />
          </div>

          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              Update Product
            </button>
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-danger me-3"
              onClick={handleDeleteProduct}
            >
              Delete Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingleAdminProduct;
