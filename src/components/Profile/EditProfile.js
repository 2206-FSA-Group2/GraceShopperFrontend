import React, {useEffect, useState} from 'react';
import { fetchUserInfo, getAddressByUserId} from '../../api';
import { Link, useNavigate } from "react-router-dom";
import EditAddress from './EditAddress';
import UserCard from './UserCard';


const EditProfile = () => {
  const [userAddress, setUserAddress] = useState([]);
  const [userInformation, setUserInformation] = useState('');
  const [showEdit, setShowEdit] = useState(false)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const profileInformation = async () => {
    const userInformation = await fetchUserInfo(token, userId);
    setUserInformation(userInformation);    
}

useEffect(() => {
  profileInformation();
}, []);

  return (
    <div style={{ display: 'flex', flex: 'column', justifyContent:'space-evenly', padding:'25px', maxheight: '550px'}}>
    <div >
      <div >
        <form >
          <div>
            <UserCard userInformation = {userInformation} user = {user} showEdit = {showEdit} setShowEdit={setShowEdit} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName}/>
          </div>
          <div style= {{display:'flex', marginTop: '20px', justifyContent: 'center'}}>
          <Link
          style={{
            backgroundColor: "#0D6EFD",
            borderRadius:'5px',
            padding: '6px',
            color: "white",
            width: "10rem",
            maxHeight: '38px',
            textDecoration: "none",
            borderStyle: 'round',
            display: "flex",
            justifyContent: "center",
            marginRight: '15px'
          }}
          to="/profile/CreateAddress"
        >
          Create Address
        </Link>
          
          <Link
          style={{
            backgroundColor: "#0D6EFD",
            borderRadius:'5px',
            padding: '6px',
            color: "white",
            width: "10rem",
            maxHeight: '38px',
            textDecoration: "none",
            borderStyle: 'round',
            display: "flex",
            justifyContent: "center",
            marginLeft: '15px'
          }}
          to="/profile/EditAddress"
        >
          Edit Addresses
        </Link>
        </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default EditProfile;
