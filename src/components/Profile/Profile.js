import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { fetchUserInfo, getAddressByUserId} from '../../api'
import Footer from '../Homepage/Footer'
import UnauthorizedRoute from '../ErrorPages/UnauthorizedRoute'
import DeleteAddress from './DeleteAddress';

const Profile = () => {
    const [userAddress, setUserAddress] = useState([]);
    const [userInformation, setUserInformation] = useState('');
    const token = localStorage.getItem('token');
    if (!token) return <UnauthorizedRoute />
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserInformation(){
            const userData = await fetchUserInfo(token, userId);
            setUserInformation(userData)
        }
        getUserInformation();
      }, []);
    
    useEffect(()=>{
        async function getUserAddress(){
            const userInfo = await getAddressByUserId(token, userId);
            setUserAddress(userInfo)
        }
        getUserAddress();
    }, []);



    return(
    <div >
      <form style = {{backgroundColor: 'lightGray'}}>
        <div >
            <div >
                <h5 style={{color: 'darkBlue'}}>
                    First Name: {userInformation.firstName}
                </h5>
                <h5 style={{color: 'darkBlue'}}>
                    Last name:  {userInformation.lastName}
                </h5>
                <h5 style={{color: 'darkBlue'}}>
                    Email: {user.email}
                </h5>
            {userAddress.map((address) =>{
                const addressId = address.id
                return(
                    <div>
                    <h5 style={{color: 'darkBlue'}}>
                    Address: {address.street1}, {address.city}, {address.state} {address.zip}
                    </h5>
                    <DeleteAddress addressId = {addressId} token = {token} userId={userId}/>
                    </div>
                )
            })}
            </div>
            <div>
                <Link style={{color: 'darkBlue'}} to="/profile/EditProfile">Edit User Information</Link>
            </div>
            <div>
                <Link style={{color: 'darkBlue'}} to="/profile/CreateAddress">Create Address</Link>
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