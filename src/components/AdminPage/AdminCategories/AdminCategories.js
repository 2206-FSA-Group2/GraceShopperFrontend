import React, {useState, useEffect} from "react";
import { getAllCategories } from "../../../api";

const AdminCategories = () => {
    const [categoriesData, setCategoriesData] = useState([])
    const token = localStorage.getItem("token");
    console.log(categoriesData)


    useEffect(() => {
        async function getData() {
          const data = await getAllCategories()
          setCategoriesData(data);

        }
        getData();
      }, []);

    return (
        <div style={{ padding: "2rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">All categories</th>
            </tr>
          </thead>
          <tbody>
            {categoriesData.map((category, idx) => {
              return (
                <tr key={idx}>
                  <td>{category.name} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
}

export default AdminCategories;