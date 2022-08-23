import React from 'react';
import UpdateUser from './UpdateUser';

const UserCard = (props) => {
    const {userInformation, user, showEdit, setShowEdit, firstName, setFirstName, lastName, setLastName, navigate } = props
    async function handleClick(event){
        event.preventDefault();
        setShowEdit(true);
    }

    return (
        <div>
        <div style={{minHeight: '200px', minWidth: '250px', borderStyle: 'inset', padding: ' 20px'}}>
            {!showEdit ? <div>
        <div>
            <h5 >First name: {userInformation.firstName}</h5>
          </div>
          <div >
            <h5 >Last name: {userInformation.lastName}</h5>
          </div>
          <div >
            <h5 >Email: {user.email}</h5>
          </div>
          <button className="btn btn-primary" style={{width: '100px'}} onClick={handleClick}> Update </button>
        </div> : null }
            {showEdit ?<UpdateUser navigate={navigate} showEdit={showEdit} setShowEdit = {setShowEdit} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName}/> : null }
        </div>
        </div>
    )
}

export default UserCard