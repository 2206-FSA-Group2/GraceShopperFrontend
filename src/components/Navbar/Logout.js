import React, {useState} from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Logout = (props) => {
  const {stateRefresh, setStateRefresh, setIsUserAdmin} = props;
  let navigate = useNavigate();

  function clearToken(event) {
    event.preventDefault()
    localStorage.clear();
    setIsUserAdmin(false)
    navigate("/");
    setStateRefresh(stateRefresh + 1);
  }

  return (
    <span className="nav-item">
    <NavLink  style={{fontWeight: "bold", backgroundColor: "#b2d8d8"}} className="nav-link" to="/" onClick={clearToken}>
      Sign Out
    </NavLink>
    </span>
  );
};

export default Logout;