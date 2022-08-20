import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../../api';

const UpdateUser = (props)=> {
    const {token, userId, setShowEdit} = props
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate;

    async function handleUpdateAddress(event){
        console.log( token, userId, email, firstName, lastName )
        const updatedUser = await updateUserInfo(token, userId, email, firstName, lastName);
        // setShowEdit(false);
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
          <div className="form-group">
            <label className="col-lg-3 control-label">Email</label>
            <div className="col-lg-8">
              <input
                className="form-control"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
            <button type= "submit">
            Update User
            </button>
        </form>
        
    )
}

export default UpdateUser