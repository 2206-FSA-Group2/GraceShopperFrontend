import React, {useState} from 'react';
import UpdateUser from './UpdateUser';

const UserCard = (props) => {
    const {userInformation, user, token} = props
    const [showEdit, setShowEdit] = useState(false)
    const userId = user.id
    async function handleClick(event){
        event.preventDefault();
        setShowEdit(true);
        console.log (token, user, userId)
    }
    return (
        <div>
        <div>
            {!showEdit ? <div>
        <div className="form-group">
            <h5  className="col-lg-3 control-label">First name: {userInformation.firstName}</h5>
          </div>
          <div className="form-group">
            <h5 className="col-lg-3 control-label">Last name: {userInformation.lastName}</h5>
          </div>
          <div className="form-group">
            <h5 className="col-lg-3 control-label">Email: {user.email}</h5>
          </div>
          <button onClick={handleClick}> Update </button>
        </div> : null }
            {showEdit ?<UpdateUser token = {token} userId = {userId} setShowEdit = {setShowEdit}/> : null }
        </div>
        </div>
    )
}

export default UserCard