import React, {useState} from 'react';
import { useNavigate, navigate } from 'react-router-dom';
import { updateUserInfo } from '../../api';

const UpdateUser = (props)=> {
    const { setShowEdit, firstName, setFirstName, lastName, setLastName, navigate} = props
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    async function handleOnClick(event){
        const updatedUser = await updateUserInfo(userId, firstName, lastName, token);
        setFirstName('');
        setLastName('');
        setShowEdit(false);
        navigate('/profile')
    }

    return (
      <div >
          <div className="form-group">
          <label  >First name</label>
          <div >
            <input type="text" onChange={(e) => setFirstName(e.target.value)} />
          </div>
        </div>
        <div >
          <label >Last name</label>
          <div >
            <input type="text" onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>
          <button className="btn btn-primary" style = {{marginTop: '8px'}} onClick={handleOnClick}>
          Update User
          </button>
      </div>
    )
}

export default UpdateUser