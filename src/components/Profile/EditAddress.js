import React, {useState} from 'react';
import { updateAddress } from '../../api';

const EditAddress = (props) => {
const { addressId } = props;
const [label, setLabel] = useState('');
const [street1, setStreet1] = useState('');
const [street2, setStreet2] = useState('');
const [city, setCity] = useState('');
const [state, setState] = useState('');
const [zipcode, setZip] = useState('');
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem("user"));
const userId = user.id;

    async function handleSubmit(event){
        event.preventDefault();
        const newAddress = await updateAddress(token, userId, addressId, label, street1, street2, city, state, zipcode)
        console.log(newAddress)
    }
    return (
        <form onSubmit = {handleSubmit}>
            <div className="form-group">
          <label  className="col-lg-3 control-label">Type of Address</label>
          <div className="col-lg-8">
            <input className="form-control" type="text" onChange={(e) => setLabel(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label  className="col-lg-3 control-label">Street 1</label>
          <div className="col-lg-8">
            <input className="form-control" type="text" onChange={(e) => setStreet1(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label  className="col-lg-3 control-label">PO Box (Optional)</label>
          <div className="col-lg-8">
            <input className="form-control" type="text" onChange={(e) => setStreet2(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label  className="col-lg-3 control-label">City</label>
          <div className="col-lg-8">
            <input className="form-control" type="text" onChange={(e) => setCity(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label  className="col-lg-3 control-label">State</label>
          <div className="col-lg-8">
            <input className="form-control" type="text" maxlength="2" onChange={(e) => setState(e.target.value)} />
            <p>Abbreviated State Name</p>
          </div>
        </div>
        <div className="form-group">
          <label  className="col-lg-3 control-label">Zip Code</label>
          <div className="col-lg-8">
            <input className="form-control" type="text" onChange={(e) => setZip(e.target.value)} />
          </div>
          <button type ="submit">
            Edit Address
          </button>
        </div>
        </form>

    )
}

export default EditAddress