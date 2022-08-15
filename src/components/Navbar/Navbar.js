import React from "react";
import { NavLink } from "react-router-dom";
import { getLocalStorage } from "../../utils/utils";
import Logout from "./Logout";

const NavBar = () => {
    const token = localStorage.getItem('token')
    console.log(token)

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">Name To Be Determined</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link active" aria-current="page">
                Home
              </NavLink>
            </li>
            {!token ? (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-link active"
                  aria-current="page"
                >
                  Login
                </NavLink>
              </li>
            ) : null}
            {!token ? (
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="nav-link active"
                  aria-current="page"
                >
                  Register
                </NavLink>
              </li>
            ) : null}
            {token ? (
              <li className="nav-item">
                <NavLink
                  to="/profile"
                  className="nav-link active"
                  aria-current="page"
                >
                  Profile
                </NavLink>
              </li>
            ) : null}
            {token ? (
              <li className="nav-item">
                <NavLink
                  to="/orders"
                  className="nav-link active"
                  aria-current="page"
                >
                  My Orders
                </NavLink>
              </li>
            ) : null}
            {token ? (
              <li className="nav-item">
                <NavLink
                  to="/wishlist"
                  className="nav-link active"
                  aria-current="page"
                >
                  My Wishlist
                </NavLink>
              </li>
            ) : null}
            {token ? (
              <li className="nav-item">
                <Logout />
              </li>
            ) : null}
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
