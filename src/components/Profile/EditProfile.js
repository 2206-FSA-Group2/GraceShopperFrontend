import React, {useEffect, useState} from 'react'
import { fetchUserInfo, getAddressByUserId, updateAddress, updateUserInfo} from '../../api'
import UserCard from './UserCard';

const EditProfile = () => {
  const [userAddress, setUserAddress] = useState('');
  const [userInformation, setUserInformation] = useState('');
  const [editUser, setEditUser] = useState('false')
  const [label, setLabel] = useState('');
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [addressId, setAddressId] = useState('')
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const profileInformation = async () => {
    const userAddress = await getAddressByUserId(token, userId)
    const userInformation = await fetchUserInfo(token, userId)
    setUserAddress(userAddress);
    setUserInformation(userInformation);
    const addressId = userAddress.id
    console.log(addressId)
    setAddressId(addressId);    
}

async function handleClick(){
  event.preventDefault();
  setEditUser(true);
}

useEffect(() => {
  profileInformation();
}, []);

async function handleSubmit(event){
  event.preventDefault();
  const updatedUser = await updateUserInfo(userId, email, firstName, lastName);
  console.log(updatedUser);
  // const updatedAddress = await updateAddress(token, addressId, label, street1, street2, city, state, zipcode);
  // console.log(updatedAddress);
}


  return (
    <div className="container">
      <h1>Edit Profile</h1>

      <div className="col-md-9 personal-info">
        <h3>Personal info</h3>

        <form className="form-horizontal" role="form" onSubmit = {handleSubmit}>
          <UserCard userInformation = {userInformation} user = {user} token = {token}/>
          <div className="form-group">
            <label className="col-md-3 control-label"></label>
            <div className="col-md-8">
              <button type = "submit">Save Profile</button>
              <span></span>
              <input type="reset" className="btn btn-default" value="Cancel" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
