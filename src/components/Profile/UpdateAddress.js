import React from 'react';
import { useNavigate } from 'react-router-dom';
import { updateAddress } from '../../api';

const UpdateAddress= (props)=> {
const {} = props;
    const navigate = useNavigate;
    async function handleUpdateUser(event){
        event.preventDefault();
        const updatedAddress = await updateAddress(token, addressId, label, street1, street2, city, state, zipcode);
        navigate("/profile")
    }

    return (
        <form onSubmit = {handleUpdateUser} >
            <div className="form-group">
          <label className="col-md-3 control-label">Description</label>
            <div className="col-md-8">
              <input className="form-control" type="text" placeholder ={userAddress.label} onChange={(e) => setLabel(e.target.value)}/>
            </div>
            <label className="col-md-3 control-label">Street</label>
            <div className="col-md-8">
              <input className="form-control" type="text" placeholder ={userAddress.street1} onChange={(e) => setStreet1(e.target.value)}/>
            </div>
            <label className="col-md-3 control-label">Address 2 (Optional):</label>
            <div className="col-md-8">
              <input className="form-control" type="text" placeholder={userAddress.street2} onChange={(e) => setStreet2(e.target.value)}/>
            </div>
            <label className="col-md-3 control-label">City:</label>
            <div className="col-md-8">
              <input className="form-control" type="text" placeholder = {userAddress.city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <label className="col-md-3 control-label">Zip Code:</label>
            <div className="col-md-8">
              <input className="form-control" type="text" placeholder ={userAddress.zip} onChange={(e) => setZipcode(e.target.value)} />
            </div>
            <label className="col-md-3 control-label">State: {userAddress.state}</label>
            <div className="ui-select">
            <label >State:</label>
              <select id = "stateSelect" placeholder={userAddress.state} onChange={(e) => setState(e.target.value)}>
                <option value="AL">AL</option>
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
            <button type= "submit">
            Update User
            </button>
        </form>
        
    )
}

export default UpdateAddress