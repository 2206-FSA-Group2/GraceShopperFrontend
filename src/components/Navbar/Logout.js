import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  let navigate = useNavigate();
  function clearToken(event) {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <button className="btn btn-dark" onClick={clearToken}>
      Sign Out
    </button>
  );
};

export default Logout;