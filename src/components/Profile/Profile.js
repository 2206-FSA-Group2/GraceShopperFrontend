import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { fetchUserInfo, getAddressByUserId} from '../../api'
import Footer from '../Homepage/Footer'
import UnauthorizedRoute from '../ErrorPages/UnauthorizedRoute'

const Profile = () => {
    const [userAddress, setUserAddress] = useState('');
    const [userInformation, setUserInformation] = useState('');
    const token = localStorage.getItem('token');
    if (!token) return <UnauthorizedRoute />
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id
    let navigate = useNavigate

    
    const profileInformation = async () => {
        const userAddress = await getAddressByUserId(token, userId)
        const userInformation = await fetchUserInfo(token, userId)
        setUserAddress(userAddress);
        setUserInformation(userInformation);    
    }

    useEffect(() => {
        profileInformation();
      }, []);
    
    return(
    <div >
      <form >
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
                <Link to="/profile/EditProfile">Edit Profile</Link>
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