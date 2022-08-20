import React, {useState} from 'react';
import { updateUserInfo } from '../../api';

const UpdateUser = (props)=> {
    const { setShowEdit, firstName, setFirstName, lastName, setLastName} = props
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    async function handleOnClick(){
        const updatedUser = await updateUserInfo(userId, firstName, lastName, token);
        console.log(firstName, lastName);
        setFirstName('');
        setLastName('')
        setShowEdit(false);
    }

    return (
      <div >
          <div className="form-group">
          <label  className="col-lg-3 control-label">First name</label>
          <div className="col-lg-8">
            <input className="form-control" type="text" onChange={(e) => setFirstName(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-lg-3 control-label">Last name</label>
          <div className="col-lg-8">
            <input className="form-control" type="text" onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>
          <button onClick={handleOnClick}>
          Update User
          </button>
      </div>
    )
}

export default UpdateUser