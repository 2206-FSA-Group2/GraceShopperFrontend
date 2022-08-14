import React, {useState, useEffect} from "react";
import { getAllCategories } from "../../api";

const FilterBox = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  
  useEffect(() => {
    async function getData() {
      const data = await getAllCategories()
      setCategoriesData(data);
    }
    getData();
  }, []);
  console.log("These are the categories,", categoriesData)
  return (
    <form>
  <div className="checkboxes filterbox">
  <label style={{textAlign: "center", fontSize: "18px", fontWeight: "bold"}}>Filter Results</label>
  <label style={{textAlign: "left", fontSize: "14px", fontWeight: "bold"}}>By Price:</label>
    <label><input type="checkbox"/> <span>Descending price</span></label>
    <label><input type="checkbox"/> <span>Ascending price</span></label>
    <label style={{textAlign: "left", fontSize: "14px", fontWeight: "bold"}}>By Department:</label>
    <label><input type="checkbox"/> <span>Render All Categories Here</span></label>
    <label style={{textAlign: "left", fontSize: "14px", fontWeight: "bold"}}>By Ratings:</label>
    <label><input type="checkbox"/> <span>Best Rated</span></label>
    <label style={{textAlign: "left", fontSize: "14px", fontWeight: "bold"}}>By Availability:</label>
    <label><input type="checkbox"/> <span>Include out of stock items</span></label>
  </div>
</form>
  );
};

export default FilterBox;
