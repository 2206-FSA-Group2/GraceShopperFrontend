import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAddress } from '../../api';

const DeleteAddress = (props) => {
    const {addressId, token, userId} = props;

    async function handleClick(event){
        const deletedAddress = await deleteAddress(token, addressId, userId); 
        location.reload(true);
    }
    return(
        <button className="btn btn-primary" style={{ width: '5rem',display:'flex', justifyContent: 'center'}} onClick={handleClick}>
            Delete
        </button>
    )
}

export default DeleteAddress