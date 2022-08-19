import React from 'react'
import { getAddressByUserId, getProfile } from '../../api'
import Footer from '../Homepage/Footer'

const Profile = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id
    console.log(token)
    console.log(user)
    

    // const userInfo = await getUser
    async function profileInformation() {
        const userAddress = getAddressByUserId(token, userId)
        // const userInformation = await 
        
    }

    // const token = getLocalStorage('token')
    return(
    <div >
      <form >
        <div className = 'card'>
            <div className = "card-body">
                <h5>
                    {/* First Name: {userInformation.firstName} */}
                </h5>
                <h5>
                    {/* Last name:  {userInformation.lastName} */}
                </h5>
                <h5>
                    Email: {user.email}
                </h5>
                <h5>
                    {/* Address: {userAddress.street1}, {userAddress.city}, {userAddress.state} {userAddress.zipcode} */}
                </h5>
                <h5>
                    <a href='/orders'>My Orders</a>
                </h5>
                <h5>
                    <a href='/cart'>My Cart</a>
                </h5>
            </div>
            <div>
                <button type= 'submit'>
                    
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