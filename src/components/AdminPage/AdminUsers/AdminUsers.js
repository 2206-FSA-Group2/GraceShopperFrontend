import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../api";
import UnauthorizedRoute from "../../ErrorPages/UnauthorizedRoute";

const AdminUsers = () => {
  const user = localStorage.getItem("user")
  const isAdmin = JSON.parse(user)
  if (!isAdmin) return <UnauthorizedRoute/>
    const [usersData, setUsersData] = useState([])
    const token = localStorage.getItem("token");

    useEffect(()=>{
        async function getData() {
            const data = await getAllUsers(token);
            setUsersData(data);
          }
          getData();
    }, [])

    return (
        <>
        <div style={{ padding: "2rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">Email</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">is Active</th>
              <th scope="col">is Admin</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user, idx) => {
              return (
                <tr key={idx}>
                  <th scope="row">{user.id}</th>

                  <td>
                    {" "}
                    <Link
                      to={`/admin/users/${user.id}`}
                      state={{ user: user }}
                    >
                      {user.email}
                    </Link>
                  </td>

                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.isActive ? "true" : "false"}</td>
                  <td>{user.isAdmin ? "true" : "false"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
        </>
    )
}

export default AdminUsers;