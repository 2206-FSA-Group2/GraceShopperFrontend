import { getInitColorSchemeScript } from "@mui/system";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";

import Typography from "@mui/material/Typography";


function goToProducts() {return}
const OrderSuccess = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { order, cart } = location.state;
  console.log(location)
  console.log(order,"XXxxx")

  if (!order) order = { id: "order_id", status: "Processing",items:[{},{},{},{}] };

  return (
    <>
      <h1 style={{ marginTop: "5rem", textAlign: "center" }}>
        Your order has been placed**
      </h1>

      <Card
        sx={{ maxWidth: 550, margin: "2rem auto" }}
        className="item"
      >
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
          {order.items.map((item, idx) => {
            return (
              <>
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
                    image={null}
                  />
                  <Typography>{order.items[idx].name||"item_name"}</Typography>
                  <Typography>Qty: {order.items[idx].quantity || 0}</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    ${order.items[idx].price||"$0.00"} 
                  </Typography>
                </div>
              </>
            );
          })}
          <Typography align="right" sx={{ fontWeight: "bold" }}>
            Total: ${order.subtotal||"$0.00"}
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
      <div style = {{marginLeft: "auto", marginRight: "auto", width: "30vw"}}>
      <h6>** Your order has been created in our database, but nothing will really happen with it from there--Our business has no employees and no inventory.  The good news is, your card has not been charged.</h6>
      </div>
    </>
  );
};

export default OrderSuccess;
