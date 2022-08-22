import React, {useState, useEffect} from "react";
import { getAllCategories } from "../../../api";
import UnauthorizedRoute from "../../ErrorPages/UnauthorizedRoute";

const AdminCategories = () => {
    const user = localStorage.getItem("user")
    const isAdmin = JSON.parse(user)
    if (!isAdmin) return <UnauthorizedRoute/>
    const [categoriesData, setCategoriesData] = useState([])
    const token = localStorage.getItem("token");




    useEffect(() => {
        async function getData() {
          const data = await getAllCategories()
          setCategoriesData(data);

        }
        getData();
      }, []);

    return (
        <div style={{ padding: "2rem" }} >
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