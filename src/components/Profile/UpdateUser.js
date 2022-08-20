import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../../api';

const UpdateUser = (props)=> {
    const {setShowEdit} = props
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate;

    async function handleUpdateUser(event){
      event.preventDefault();
        console.log( token, userId, firstName, lastName )
        const updatedUser = await updateUserInfo(userId, firstName, lastName, token);
        setShowEdit(false);
        console.log(updatedUser)
    }

    return (
      <form onSubmit = {handleUpdateUser} >
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

export default UpdateUser