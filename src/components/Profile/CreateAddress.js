import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { createAddress } from '../../api';

const CreateAddress = () => {
const [label, setLabel] = useState('');
const [street1, setStreet1] = useState('');
const [street2, setStreet2] = useState('');
const [city, setCity] = useState('');
const [state, setState] = useState('');
const [zipcode, setZip] = useState('');
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem("user"));
const userId = user.id;
const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault();
        const newAddress = await createAddress(token, userId, label, street1, street2, city, state, zipcode);
        navigate('/profile')
    }
    return (
        <form style={{display:'flex', justifyContent:'center'}} onSubmit = {handleSubmit}>
          <div className = 'card' style = {{display: 'flex', justifyContent:'center', width: '75%', height: '50%', padding: '10px', margin: '15px'}}>
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
          <label  className="col-lg-3 control-label">Street 2</label>
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
          <label  className="col-lg-3 control-label">State Abbreviated</label>
          <div className="col-lg-8">
            <input className="form-control" type="text" maxLength="2" onChange={(e) => setState(e.target.value)} />
            
          </div>
        </div>
        <div className="form-group">
          <label  className="col-lg-3 control-label">Zip Code</label>
          <div className="col-lg-8">
            <input className="form-control" type="text" onChange={(e) => setZip(e.target.value)} />
          </div>
          <button className="btn btn-primary" style ={{marginTop: '5px'}} type ="submit">
            Create Address
          </button>
        </div>
        </div>
        </form>

    )
}

export default CreateAddress