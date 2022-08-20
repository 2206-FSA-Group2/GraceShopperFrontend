import React, {useState} from 'react';
import { updateUserInfo } from '../../api';

const TestingUpdate = ()=>{
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    

    async function handleUpdateAddress(event){
        event.preventDefault();
        console.log (token, firstName, lastName, userId)
    const updatedUser = await updateUserInfo(userId, firstName, lastName, token);
    console.log(updatedUser)
    } 


    return (
        <form onSubmit = {handleUpdateAddress} >
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
            <button type= "submit">
            Update User
            </button>
        </form>
    )
}

export default TestingUpdate