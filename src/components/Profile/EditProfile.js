import React, {useEffect, useState} from 'react'
import { fetchUserInfo, getAddressByUserId, updateUserInfo} from '../../api'
import UserCard from './UserCard';


const EditProfile = () => {
  const [userAddress, setUserAddress] = useState('');
  const [userInformation, setUserInformation] = useState('');
  const [showEdit, setShowEdit] = useState(false)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    // const userAddress = await getAddressByUserId(token, userId)
    const userInformation = await fetchUserInfo(token, userId)
    // setUserAddress(userAddress);
    console.log(userInformation);
    setUserInformation(userInformation);
    const addressId = userAddress.id
    setAddressId(addressId);    
}

useEffect(() => {
  profileInformation();
}, []);

  return (
    <div style={{display: 'flex', flex: 'row'}}>
    <div className="container">
      {/* <TestingUpdate /> */}
      <div className="col-md-9 personal-info">
        <h3>Personal info</h3>

        <form className="form-horizontal" role="form" >
          <UserCard userInformation = {userInformation} user = {user} showEdit = {showEdit} setShowEdit={setShowEdit} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName}/>
        </form>
      </div>
    </div>
    <div>
      <p>This is Address card</p>
    </div>
    </div>
  );
};

export default EditProfile;
