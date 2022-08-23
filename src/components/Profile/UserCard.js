import React from 'react';
import { Link } from 'react-router-dom'

const UserCard = (props) => {
    const {userInformation, user, showEdit, setShowEdit, firstName, setFirstName, lastName, setLastName, navigate } = props
    async function handleClick(event){
        event.preventDefault();
        setShowEdit(true);
    }

    return (
        <div style={{minHeight: '200px', minWidth: '250px', borderStyle: 'inset', padding: ' 20px', backgroundColor:'white'}}>

        <div>
            <h5 >First name: {userInformation.firstName}</h5>
          </div>
          <div >
            <h5 >Last name: {userInformation.lastName}</h5>
          </div>
          <div >
            <h5 >Email: {user.email}</h5>
          </div>
          <Link style={{
                    backgroundColor: "#0D6EFD",
                    borderRadius:'5px',
                    color: "white",
                  width: "15rem",
                  padding: "6px",
                  textDecoration: "none",
                }} to='/profile/EditUser'>Update User</Link>
        </div>
    )
}

export default UserCard