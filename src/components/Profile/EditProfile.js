import React, {useEffect, useState} from 'react'
import { fetchUserInfo, getAddressByUserId} from '../../api'

const EditProfile = () => {
  const [userAddress, setUserAddress] = useState('');
  const [userInformation, setUserInformation] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [label, setLabel] = useState('');
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  const profileInformation = async () => {
    const userAddress = await getAddressByUserId(token, userId)
    const userInformation = await fetchUserInfo(token, userId)
    setUserAddress(userAddress);
    setUserInformation(userInformation);    
}
useEffect(() => {
  profileInformation();
}, []);
  return (
    <div className="container">
      <h1>Edit Profile</h1>

      <div className="col-md-9 personal-info">
        <h3>Personal info</h3>

        <form className="form-horizontal" role="form">
          <div className="form-group">
            <label  className="col-lg-3 control-label">First name:</label>
            <div className="col-lg-8">
              <input placeholder = {userInformation.firstName} className="form-control" type="text" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Last name:</label>
            <div className="col-lg-8">
              <input className="form-control" type="text" placeholder={userInformation.lastName} />
            </div>
          </div>
          <div className="form-group">
            <label className="col-lg-3 control-label">Email:</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                placeholder = {user.email}
              />
            </div>
          </div>
          <div className="form-group">
          <label className="col-md-3 control-label">Description</label>
            <div className="col-md-8">
              <input className="form-control" type="text" placeholder ={userAddress.label}/>
            </div>
            <label className="col-md-3 control-label">Street</label>
            <div className="col-md-8">
              <input className="form-control" type="text" placeholder ={userAddress.street1}/>
            </div>
            <label className="col-md-3 control-label">Address 2 (Optional):</label>
            <div className="col-md-8">
              <input className="form-control" type="text" placeholder={userAddress.street2}/>
            </div>
            <label className="col-md-3 control-label">City:</label>
            <div className="col-md-8">
              <input className="form-control" type="text" placeholder = {userAddress.city} />
            </div>
            <label className="col-md-3 control-label">Zip Code:</label>
            <div className="col-md-8">
              <input className="form-control" type="text" placeholder ={userAddress.zip} />
            </div>
            <label className="col-md-3 control-label">State: {userAddress.state}</label>
            <div className="ui-select">
            <label >State:</label>
              <select id = "stateSelect" placeholder={userAddress.state}>
                <option  value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option selected = "selected" value="DE">DE</option>
                <option value="DC">DC</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label"></label>
            <div className="col-md-8">
              <input
                type="button"
                className="btn btn-primary"
                value="Save Changes"
              />
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
