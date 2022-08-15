import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../../api";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getAllProducts();
      setProductsData(data);
    }
    getData();
  }, []);

  return (
    <div style={{padding: "2rem"}}>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Product Id</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {productsData.map((product, idx) => {
            return (

          <tr key={idx}>
            <th scope="row">{product.id}</th>
           
            <td> <Link to={`/admin/products/${product.id}`} state={{ product: product }} >{product.name} </Link></td>
     
            <td>{product.description}</td>
            <td>{product.price}</td>

          </tr>

            )
        })}
      </tbody>
    </table>
    </div>
  );
};

export default AdminProducts;
