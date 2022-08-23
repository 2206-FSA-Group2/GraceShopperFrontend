import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { updateUserInfo } from '../../api';

const UpdateUser = ()=> {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const navigate = useNavigate();

    async function handleOnClick(event){
        const updatedUser = await updateUserInfo(userId, firstName, lastName, token);
        setFirstName('');
        setLastName('');
        navigate('/profile')
    }

    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
          <div className="card" style={{}}>
          <label  >First name</label>
          <div >
            <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        </div>
          <label >Last name</label>
          <div >
            <input type="text" onChange={(e) => setLastName(e.target.value)} />
          </div>
          <button className="btn btn-primary" style = {{marginTop: '8px'}} onClick={handleOnClick}>
          Update User
          </button>
        </div>
          
      </div>
    )
}

export default UpdateUser