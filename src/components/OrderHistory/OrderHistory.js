import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getPurchasedCartsByUserId } from "../../api";
import { CardMedia } from "@mui/material";

const OrderHistory = () => {
  const [ordersData, setOrdersData] = useState([]);
  const token = localStorage.getItem("token");
  console.log(ordersData, "this is the data");

  useEffect(() => {
    async function getData() {
      const data = await getPurchasedCartsByUserId(token);
      setOrdersData(data);
    }
    getData();
  }, []);

  return (
    <div style={{ paddingTop: "2rem" }}>
      {ordersData.length > 0
        ? ordersData.map((order, idx) => {
            let subtotal = 0
            for (let i = 0; i < order.items.length; i++){
                subtotal += order.items[i].quantity * order.items[i].price;
            }
            return (
              <Card sx={{ maxWidth: 550, margin: "0 auto" }} key={idx} className="item">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.primary"
                    gutterBottom
                  >
                    Order Id: {order.order[0].id}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, fontWeight:"bold" }}
                    color="text.primary"
                    gutterBottom
                  >
                    Order Status: {order.order[0].status}
                  </Typography>
                  {order.items.map((item, idx)=>{return(
                    <>
                    <div style={{display: "flex", alignItems:"center", fontFamily:"sans-serif", justifyContent:"space-between"}}>
                    <CardMedia component="img" sx={{height:100, width:100, padding:"0.3rem", borderRadius:"50%"}} image={order.items[idx].images[0].url}/>
                    <Typography>{order.items[idx].name}</Typography>
                    <Typography >Qty: {order.items[idx].quantity}</Typography>
                    <Typography sx={{fontWeight:"bold"}}>{order.items[idx].price}</Typography>
                    </div>
                    </>
                    )})}
                    <Typography align="right" sx={{fontWeight:"bold"}}>Total: {subtotal}</Typography>
                </CardContent>
              </Card>
            );
          })
        : <h5 style={{textAlign: "center"}}>You've got no order history with us! Hurry up and shop </h5>}
    </div>
  );
};

export default OrderHistory;
