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
      <form style={{backgroundColor: '#D9D0C7', display: 'flex', justifyContent: 'center', }}>
        <div className='card' style={{ width: '25rem', backgroundColor: 'lightGray', display: 'flex', justifyContent: 'center'}}>
            <div className="card-body" style = {{backgroundColor: "#222620"}}>
                <h5 style={{color:'#45788C'}}>
                    First Name: {userInformation.firstName}
                </h5>
                <h5 style={{color:'#45788C'}}>
                    Last name:  {userInformation.lastName}
                </h5>
                <h5 style={{color:'#45788C'}}>
                    Email: {user.email}
                </h5>
                <div style={{backgroundColor: "#222620", width: '15rem'}}>
                <Link style={{backgroundColor: '#D9D0C7', color:'#45788C', width:'15rem', padding: '5px', textDecoration:'none', outline: '2px solid black'}} to="/profile/EditProfile">Edit User Information</Link>
            </div>
            </div>
            </div>
        </form>
        <div style={{backgroundColor: '#D9D0C7', display: 'flex', justifyContent:'center', padding: '10px'}}>
                <Link style={{backgroundColor: '#D9D0C7', color:'#45788C', width:'10rem',textDecoration:'none', outline: '2px solid black', display: 'flex', justifyContent:'center'}} to="/profile/CreateAddress">Create Address</Link>
            </div>
        <div>
            <div style={{backgroundColor: '#D9D0C7', display: 'flex', justifyContent: 'space-around', justifyItems:'center'}}>
                {userAddress.map((address, idx) =>{
                const addressId = address.id
                return(
                    <div className= 'card' style={{width: '15rem', backgroundColor:"#222620", display:'flex', justifyContent: 'center', padding: '15px'}} key={idx}>
                    <h5 style={{color:'#45788C'}}>
                    Address {idx+1}  
                    </h5>
                    <h3 style={{color:'#45788C'}}>Street: {address.street1}</h3>
                    <h3 style={{color:'#45788C'}}>City: {address.city}</h3>
                    <h3 style={{color:'#45788C'}}>State: {address.state}</h3>
                    <h2 style={{color:'#45788C'}}>Zip Code: {address.zip}</h2>
                    <DeleteAddress addressId = {addressId} token = {token} userId={userId}/>
                    </div>
                )
            })}
            </div>
        
        
        </div> 
    <div>
        <Footer/>  
    </div>    
  </div>
    ) 
}

export default Profile