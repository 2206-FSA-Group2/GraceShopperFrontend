import React, { useState } from "react";
import { Rating } from "@mui/material";
import { createReview } from "../../api";


const CreateReview = (props) => {
  const { items, searchProduct, setSearchProduct, setAddedReview, setAddingReview } = props;
  console.log(props)
  const token = localStorage.getItem("token");
  const [value, setValue] = useState("");


  async function handleReviewSubmit(event) {
    event.preventDefault()
    const itemId = event.target[0].value
    const reviewTitle = event.target[7].value;
    const reviewDescription = event.target[8].value;
    await createReview(itemId, value, reviewTitle, reviewDescription, token)
    setSearchProduct(searchProduct + 1)
    setAddedReview(true)    
    setAddingReview(false)
    
  }

  return (
    <>
    
      <div
        className="card item"
        style={{ width: "25%", margin: "0 auto", marginTop: "2rem" }}
      >
        <p className="card-header">Add your review</p>
        <div className="card-body">
        <div className="form-outline col-md-6 mb-4">
            <form onSubmit={handleReviewSubmit}>
        <div className="col-auto">
            <select style={{maxWidth: "150px"}} className="form-select-sm">
            <option  defaultValue>Choose Item</option>
            {
                items.map((item, idx)=>{return(
                <option key={idx} value={item.id}>{item.name}</option>
              )})
            }
            </select>
          </div>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <input
                placeholder="Title"
                type="text"
                id="reviewTitle"
                className="form-control"
                
                style={{ padding: ".1rem", marginBottom: "1rem", width: "200%" }}
              />
              <input
                placeholder="Description"
                type="text"
                id="reviewDescription"
                className="form-control"
                style={{ padding: ".1rem", width: "200%" }}
              />
              <button
                style={{ marginTop: "1rem" }}
                type="submit"
                className="btn btn-primary me-3 btn-sm"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReview;
