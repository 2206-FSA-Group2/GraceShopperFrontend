import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, Link, useResolvedPath } from "react-router-dom";
import { getLocalStorage } from "../../utils/utils";
import SearchForm from "../SearchForm/SearchForm";
import Logout from "./Logout";

const NavBar = (props) => {
  const { stateRefresh, setStateRefresh, categoriesData, isUserAdmin, setIsUserAdmin } = props;
 
  const token = localStorage.getItem("token");
  const user = getLocalStorage("user");


  async function handleClickCategory(event) {
    event.preventDefault();
    const categoryClicked = event.target.innerText;
    document.getElementById("searchFormInput").value = categoryClicked;
    document.getElementById("searchFormButton").click();
    setStateRefresh(stateRefresh + 1);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <a className="navbar-brand">NAMEHERE</a>
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
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              { !isUserAdmin && 
                <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Shop by Categories
                </a>
                <ul className="dropdown-menu">
                  {categoriesData.map((category, idx) => {
                    return (
                      <li key={idx}>
                        <a
                          className="dropdown-item"
                          href=""
                          onClick={handleClickCategory}
                        >
                          {category.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>}

              {isUserAdmin ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/products">
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/users">
                      Users
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/categories">
                      Categories
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/orders">
                      Orders
                    </NavLink>
                  </li>
                </>
              ) : null}
              {token && !isUserAdmin ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                      My Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/orders">
                      Order History
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/wishlist">
                      Wishlist
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
            <div className="d-flex ">
              <ul className="navbar-nav me-auto">
                {token ? (
                  <>
                    <div>
                      <span className="nav-item">
                        <a className="nav-link">Logged in as: {user.email}</a>
                      </span>
                    </div>
                    <div>
                      <Logout
                        setIsUserAdmin={setIsUserAdmin}
                        stateRefresh={stateRefresh}
                        setStateRefresh={setStateRefresh}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="nav-item">
                        <NavLink className="nav-link" to="/login">
                          Login
                        </NavLink>
                      </span>
                    </div>
                    <div>
                      <span className="nav-item">
                        <NavLink className="nav-link" to="/register">
                          SignUp
                        </NavLink>
                      </span>
                    </div>
                  </>
                )}
                <NavLink to="/cart">
                  <button className="bi bi-cart3 btn btn-primary "></button>
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
