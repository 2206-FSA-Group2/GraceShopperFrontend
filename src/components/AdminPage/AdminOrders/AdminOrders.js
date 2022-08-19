import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrder } from "../../../api";
import UnauthorizedRoute from "../../ErrorPages/UnauthorizedRoute";

const AdminOrders = () => {
    const user = localStorage.getItem("user")
    const isAdmin = JSON.parse(user)
    if (!isAdmin) return <UnauthorizedRoute/>
    const [ordersData, setOrdersData] = useState([])
    const [counter, setCounter] = useState(0)
    const token = localStorage.getItem("token");
    
    async function handleUpdateOrder(event){
        event.preventDefault()
        const orderId = event.target[0].value
        const orderStatus = event.target[1].value
        if (orderStatus === "Choose Status") return;
        const result = await updateOrder(orderId, orderStatus, token)
        if (result) setCounter(counter + 1)
        event.target[0].value = ""
        event.target[1].value = ""
    }

    useEffect(() => {
        async function getData() {
          const data = await getAllOrders(token)
          setOrdersData(data);

        }
        getData();
      }, [counter]);

    return (
        <>
         <form
          className="row g-3 justify-content-center"
          style={{ marginTop: "1rem" }}
          onSubmit={handleUpdateOrder}
        >
          <div className="col-auto ">
            <input
              type="text"
              className="form-control"
              id="orderId"
              placeholder="Order Id"
            />
          </div>
          <div className="col-auto">
          <select className="form-select">
            <option>Choose Status</option>
            <option>Received</option>
            <option>Shipped</option>
            <option>Delivered</option>
        </select>
          </div>

          <div className="col-auto">
            <button type="submit" className="btn btn-primary me-3">
              Update Order
            </button>
          </div>
        </form>
        <div style={{ padding: "2rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Cart Id</th>
              <th scope="col">Address Id</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order, idx) => {
              return (
                <tr key={idx}>
                  <th scope="row">{order.id}</th>
                  <td>{order.cart_id} </td>
                  <td>{order.address_id}</td>
                  <td>{order.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </>
    )
}

export default AdminOrders;