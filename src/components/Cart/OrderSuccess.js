
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";

import Typography from "@mui/material/Typography";
import { getMyCart } from "../../api";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order, cart, subtotal } = location.state;

  useEffect(() => {
    if (localStorage.getItem("user")) getMyCart();
  }, []);
  function goToProducts() {
    navigate("/Products");
  }

  return (
    <>
      <h1 style={{ marginTop: "5rem", textAlign: "center" }}>
        Your order has been placed**
      </h1>

      <Card sx={{ maxWidth: 550, margin: "2rem auto" }} className="item">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            Order Id: {order.id}
          </Typography>
          <Typography
            sx={{ fontSize: 14, fontWeight: "bold" }}
            color="text.primary"
            gutterBottom
          >
            Order Status: {order.status}
          </Typography>
          {cart.items.map((item, idx) => {
            return (
              <div key={`${item.id},${idx}`}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "sans-serif",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 100,
                      width: 100,
                      padding: "0.3rem",
                      borderRadius: "50%",
                    }}
                    image={item?.images[0].url}
                  />
                  <Typography>{item?.name}</Typography>
                  <Typography>Qty: {item?.quantity}</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    ${item.price}
                  </Typography>
                </div>
              </div>
            );
          })}
          <Typography align="right" sx={{ fontWeight: "bold" }}>
            Total: ${subtotal}
          </Typography>
          <button
            style={{ marginTop: "1rem" }}
            type="button"
            className="btn btn-primary me-3 btn-sm"
            onClick={goToProducts}
          >
            Shop For More
          </button>
        </CardContent>
      </Card>
      <div style={{ marginLeft: "auto", marginRight: "auto", width: "30vw" }}>
        <h6>
          ** Your order has been created in our database, but nothing will
          really happen with it from there--Our business has no employees and no
          inventory. The good news is, your card has not been charged.
        </h6>
      </div>
    </>
  );
};

export default OrderSuccess;
