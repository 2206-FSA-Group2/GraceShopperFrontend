import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { getPurchasedCartsByUserId } from "../../api";
import { CardMedia } from "@mui/material";
import UnauthorizedRoute from "../ErrorPages/UnauthorizedRoute";
import CreateReview from "../Reviews/CreateReview";


const OrderHistory = (props) => {
  const {setSearchProduct, searchProduct} = props
  const [ordersData, setOrdersData] = useState([]);
  const [addingReview, setAddingReview] = useState(false)
  const [addedReview, setAddedReview] = useState(false)
  const token = localStorage.getItem("token");
  if (!token) return <UnauthorizedRoute />
  console.log(ordersData, "this is the data");

  function handleReviews(){
    setAddingReview(true)
  }


  useEffect(() => {
    async function getData() {
      const data = await getPurchasedCartsByUserId(token);
      setOrdersData(data);
    }
    getData();
  }, []);

  return (
    <>
    <h1 style={{textAlign: "center", paddingTop : ".8rem"}}>Your order history!</h1>
    <div >
    {addedReview && (
                  <div
                    className="alert alert-success text-center w-25 mx-auto"
                    role="alert"
                  >
                    Your review has been added!
                    <button
                      type="button"
                      className="btn-close ms-5"
                      aria-label="Close"
                      onClick={()=>{setAddedReview(false)}}
                    ></button>
                  </div>
                )}
      {ordersData.length > 0
        ? ordersData.map((order, idx) => {
            let subtotal = 0
            for (let i = 0; i < order.items.length; i++){
                subtotal += order.items[i].quantity * order.items[i].price;
            }
            console.log(order)
            return (
              <>
              {
                addingReview ? <CreateReview items={order.items} searchProduct={searchProduct} setSearchProduct={setSearchProduct} setAddedReview={setAddedReview} setAddingReview={setAddingReview}/> :
              
              <Card sx={{ maxWidth: 550, margin: "2rem auto"}} key={idx} className="item">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.primary"
                    gutterBottom
                  >
                    Order Id: {order.order[0]?.id}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14, fontWeight:"bold" }}
                    color="text.primary"
                    gutterBottom
                  >
                    Order Status: {order.order[0]?.status}
                  </Typography>
                  {order.items.map((item, idx)=>{return(
                    <>
                    <div style={{display: "flex", alignItems:"center", fontFamily:"sans-serif", justifyContent:"space-between"}}>
                    <CardMedia component="img" sx={{height:100, width:100, padding:"0.3rem", borderRadius:"50%"}} image={order.items[idx].images[0].url}/>
                    <Typography>{order.items[idx].name}</Typography>
                    <Typography >Qty: {order.items[idx].quantity}</Typography>
                    <Typography sx={{fontWeight:"bold"}}>${order.items[idx].price}</Typography>
                    </div>
                    </>
                    )})}
                    <Typography align="right" sx={{fontWeight:"bold"}}>Total: ${subtotal}</Typography>
                    <button
                style={{ marginTop: "1rem" }}
                type="button"
                className="btn btn-primary me-3 btn-sm"
                onClick={handleReviews}
              >
                Add reviews to your items
             </button>
                </CardContent>
              </Card>
            }              
              </>
            );
          })
        : <h5 style={{textAlign: "center"}}>You've got no order history with us! Hurry up and shop </h5>}
    </div>
    </>
  );
};

export default OrderHistory;
