import { borderBottom } from '@mui/system';
import React, {useState} from 'react';
import { updateAddress } from '../../api';

const EditAddress = (props) => {
const { addressId, address, idx } = props;
const [label, setLabel] = useState('');
const [street1, setStreet1] = useState('');
const [street2, setStreet2] = useState('');
const [city, setCity] = useState('');
const [state, setState] = useState('');
const [zipcode, setZip] = useState('');
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem("user"));
const userId = user.id;
console.log(addressId)



    async function handleSubmit(event){
        event.preventDefault();
        const newAddress = await updateAddress(token, userId, addressId, label, street1, street2, city, state, zipcode)
        console.log(newAddress)
    }
    return (
        <form onSubmit = {handleSubmit} style ={{padding: '10px', borderBottom:'2px solid black'}} >
          <label>Address {idx+1}</label>
            <div className="form-group" key ={idx}>
              
          <label  className="col-lg-3 control-label">Type of Address</label>
          <div className="col-lg-8">
            <input className="form-control-sm" placeholder={address.label} type="text" onChange={(e) => setLabel(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label  className="col-lg-3 control-label">Street 1</label>
          <div className="col-lg-8">
            <input className="form-control-sm" placeholder = {address.street1} type="text" onChange={(e) => setStreet1(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label  className="col-lg-3 control-label">Street2 (Optional)</label>
          <div className="col-lg-8">
            <input className="form-control-sm" placeholder = {address.street2} type="text" onChange={(e) => setStreet2(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label  className="col-lg-3 control-label">City</label>
          <div className="col-lg-8">
            <input className="form-control-sm" placeholder = {address.city} type="text" onChange={(e) => setCity(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label  className="col-lg-3 control-label">State</label>
          <div className="col-lg-8">
            <input className="form-control-sm" type="text" placeholder={address.state} maxLength="2" onChange={(e) => setState(e.target.value)} />
            <p>Abbreviated State Name</p>
          </div>
        </div>
        <div className="form-group">
          <label  className="col-lg-3 control-label">Zip Code</label>
          <div className="col-lg-8">
            <input className="form-control-sm" placeholder={address.zip} type="text" onChange={(e) => setZip(e.target.value)} />
          </div>
          <button >
            Edit Address
          </button>
        </div>
        </form>

    )
}

export default EditAddress