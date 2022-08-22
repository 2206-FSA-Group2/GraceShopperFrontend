import React from 'react';
import { deleteAddress } from '../../api';

const DeleteAddress = (props) => {
    const {addressId, token, userId} = props

    async function handleClick(event){
        const deletedAddress = await deleteAddress(token, addressId, userId);
        console.log(deletedAddress)
    }
    return(
        <button onClick={handleClick}>
            Delete
        </button>
    )
}

export default DeleteAddress