import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  deactivateUser,
} from "../../../api";
import UnauthorizedRoute from "../../ErrorPages/UnauthorizedRoute";

const SingleAdminUser = () => {
  const isUser = localStorage.getItem("user")
  const isUserAdmin = JSON.parse(isUser)
  if (!isUserAdmin) return <UnauthorizedRoute/>
  
  let navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const { id, first_name, last_name, email, isActive, isAdmin } = user;
  const token = localStorage.getItem("token");

  async function handleDeactivateUser(event) {
    event.preventDefault();
    const deactivatedUser = await deactivateUser(id, token);
    console.log(deactivatedUser);
    navigate("/admin/users");
  }

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Email</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">is Active</th>
              <th scope="col">is Admin</th>
              <th scope="col">Deactivate User</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{id}</th>
              <td> {email} </td>
              <td> {first_name}</td>
              <td>{last_name}</td>
              <td>{user.isActive ? "true" : "false"}</td>
              <td>{user.isAdmin ? "true" : "false"}</td>
              <td>
                <button
                  type="submit"
                  className="btn btn-danger me-3 btn-sm"
                  onClick={handleDeactivateUser}
                >
                  Deactivate User
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
    </>
  );
};

export default SingleAdminUser;
