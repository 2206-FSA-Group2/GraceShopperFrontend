import React, {useEffect, useState} from 'react'
import { fetchUserInfo, getAddressByUserId} from '../../api'
import CreateAddress from './CreateAddress';
import EditAddress from './EditAddress';
import UserCard from './UserCard';


const EditProfile = () => {
  const [userAddress, setUserAddress] = useState([]);
  const [userInformation, setUserInformation] = useState('');
  const [showEdit, setShowEdit] = useState(false)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const profileInformation = async () => {
    const userAddress = await getAddressByUserId(token, userId)
    const userInformation = await fetchUserInfo(token, userId)
    setUserAddress(userAddress);
    console.log(userInformation);
    setUserInformation(userInformation);    
}

useEffect(() => {
  profileInformation();
}, []);

  return (
    <div style={{backgroundColor: 'lightGray', display: 'flex', flex: 'column', justifyContent:'space-evenly'}}>
    <div style={{backgroundColor: 'lightGray'}}>
      <div className="col-md-9 personal-info">
        <h3>Personal info</h3>

        <form className="form-horizontal" role="form" style={{backgroundColor: 'lightGray'}} >
          <div>
            <UserCard userInformation = {userInformation} user = {user} showEdit = {showEdit} setShowEdit={setShowEdit} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName}/>
          </div>
        </form>
      </div>
    </div>
    <div>
      {userAddress.map((address, idx)=>{
        const addressId = address.id
        return(
          <EditAddress userAddress={userAddress} addressId={addressId} address={address} idx={idx}/>
        )
      })}
      
    </div>
    </div>
  );
};

export default EditProfile;
