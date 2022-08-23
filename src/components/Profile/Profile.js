import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserInfo, getAddressByUserId } from "../../api";
import Footer from "../Homepage/Footer";
import UnauthorizedRoute from "../ErrorPages/UnauthorizedRoute";
import DeleteAddress from "./DeleteAddress";

const Profile = () => {
  const [userAddress, setUserAddress] = useState([]);
  const [userInformation, setUserInformation] = useState("");
  const token = localStorage.getItem("token");
  if (!token) return <UnauthorizedRoute />;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  useEffect(() => {
    async function getUserInformation() {
      const userData = await fetchUserInfo(token, userId);
      setUserInformation(userData);
    }
    getUserInformation();
  }, []);

  useEffect(() => {
    async function getUserAddress() {
      const userInfo = await getAddressByUserId(token, userId);
      setUserAddress(userInfo);
    }
    getUserAddress();
  }, []);

  return (
    <div>
      <form style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="card"
          style={{
            width: "25rem",
            backgroundColor: "lightGray",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="card-body" style={{ backgroundColor: "white" }}>
            <h5 >
              First Name: {userInformation.firstName}
            </h5>
            <h5 >
              Last name: {userInformation.lastName}
            </h5>
            <h5 >Email: {user.email}</h5>
            <div style={{ backgroundColor: "white", width: "15rem" }}>
              <Link
                style={{
                    backgroundColor: "#0D6EFD",
                    borderRadius:'5px',
                    color: "white",
                  width: "15rem",
                  padding: "6px",
                  textDecoration: "none",
                }}
                to="/profile/EditProfile"
              >
                Edit User Information
              </Link>
            </div>
          </div>
        </div>
      </form>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "10px" }}
      >
        
        
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyItems: "center",
            justifyContent: 'space-evenly'
          }}
        >
            <div style = {{display: 'flex', justifyContent: 'center'}}>
            <p >
                  <a
                    className="btn btn-primary"
                    data-bs-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Addresses
                  </a>
                </p>
            </div>
          {userAddress.map((address, idx) => {
            const addressId = address.id;
            return (
              <div key={idx}>
                
                <div className="collapse" id="collapseExample">
                  <div
                    className="card"
                    style={{
                      width: "15rem",
                      backgroundColor: "white",
                      padding: "15px",
                    }}
                    key={idx}
                  >
                    <p style={{ color: "#45788C", borderStyle: 'inset'}}>
                      Street: {address.street1}
                    </p>
                    <p style={{ color: "#45788C", borderStyle: 'inset'}}>City: {address.city}</p>
                    <p style={{ color: "#45788C", borderStyle: 'inset' }}>State: {address.state}</p>
                    <p style={{ color: "#45788C", borderStyle: 'inset' }}>Zip Code: {address.zip}</p>
                    <DeleteAddress
                      addressId={addressId}
                      token={token}
                      userId={userId}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
