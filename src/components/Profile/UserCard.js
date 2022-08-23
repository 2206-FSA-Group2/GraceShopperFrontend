import React from 'react';
import UpdateUser from './UpdateUser';

const UserCard = (props) => {
    const {userInformation, user, showEdit, setShowEdit, firstName, setFirstName, lastName, setLastName } = props
    async function handleClick(event){
        event.preventDefault();
        setShowEdit(true);
    }

    return (
        <div>
        <div>
            {!showEdit ? <div>
        <div className="form-group">
            <h3  className="col-lg-3 control-label">First name: {userInformation.firstName}</h3>
          </div>
          <div className="form-group">
            <h3 className="col-lg-3 control-label">Last name: {userInformation.lastName}</h3>
          </div>
          <div className="form-group">
            <h3 className="col-lg-3 control-label">Email: {user.email}</h3>
          </div>
          <button onClick={handleClick}> Update </button>
        </div> : null }
            {showEdit ?<UpdateUser showEdit={showEdit} setShowEdit = {setShowEdit} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName}/> : null }
        </div>
        </div>
    )
}

export default UserCard