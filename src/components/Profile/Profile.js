import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchUserInfo, getAddressByUserId} from '../../api'
import Footer from '../Homepage/Footer'

const Profile = () => {
    const [userAddress, setUserAddress] = useState('');
    const [userInformation, setUserInformation] = useState('');
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    let navigate = useNavigate;
    
    async function handleEditProfileSubmit(event){
        event.preventDefault();
        console.log("You clicked");
        navigate("/profile/EditProfile");
    }

    useEffect(() => {
        async function profileInformation(){
            const userAddress = await getAddressByUserId(token, userId)
        const userInformation = await fetchUserInfo(token, userId)
        setUserAddress(userAddress);
        setUserInformation(userInformation);
        };
        profileInformation();
      }, []);
    
    return(
    <div >
      <form onSubmit={handleEditProfileSubmit}>
        <div className = 'card'>
            <div className = "card-body">
                <h5>
                    First Name: {userInformation.firstName}
                </h5>
                <h5>
                    Last name:  {userInformation.lastName}
                </h5>
                <h5>
                    Email: {user.email}
                </h5>
                <h5>
                    Address: {userAddress.street1}, {userAddress.city}, {userAddress.state} {userAddress.zip}
                </h5>
            </div>
            <div>
                <button type= "submit">
                    Edit Profile
                </button>
            </div>
        </div>
        </form>
        <div>
        <Footer/>  
        </div>
               
  </div>
    ) 
}

export default Profile