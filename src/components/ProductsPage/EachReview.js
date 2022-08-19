import React, { useState, useEffect } from "react";
import {Rating} from "@mui/material";

const EachReview = (props) => {
  const { reviews } = props;
  
  return (
    <ul className="list-group list-group container mt-5 mb-5 col-md-8">
      {reviews.length > 0
        ? reviews.map((review, idx) => {
            return (
              <li className="list-group-item d-flex justify-content-between align-items-start" key={idx}>
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{review.title}</div>
                  {review.description}
                </div>
                <Rating name="read-only" value={reviews[0].rating} readOnly />
              </li>
            );
          })
        : null}
    </ul>
  );
};

export default EachReview;
