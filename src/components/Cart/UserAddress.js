//This component should only be placed in a context where a logged in user exists.
//
import { useEffect, useState } from "react";
import { createAddress, getAddressByUserId, getsUserData, updateAddress } from "../../api";
import { Row, Col, Button } from "react-bootstrap";

const UserAddress = () => {
  const [showAddressSelect, setShowAddressSelect] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [userIsEditingAddress, setUserIsEditingAddress] = useState(false);
  const [userIsCreatingNewAddress, setUserIsCreatingNewAddress] =
    useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  const token = localStorage.getItem("token");

  //fetch the user's data when the component is rendered
  useEffect(() => {
    (async () => {
      try {
        //set the user's first & last name  
        const userData = await getsUserData(token);  
        setFirstName(userData.first);
        setLastName(userData.last);

        //if the user has addresses on file, populate them in state and select the first one in the array
        const addressesFromApi = await getAddressByUserId(token, user.id)
        setAddresses(addressesFromApi);
        console.log(addresses)
        if (addresses.length) {
            setSelectedAddress(addresses[0]);
            setUserIsCreatingNewAddress(false); setUserIsEditingAddress(false);
        }

        //otherwise, set us up with the means to create an address
        else {
            setUserIsCreatingNewAddress(true);


        }

      } catch (error) {
        throw error;
      }
    })();
  }, []);

  function handleStreet1Change(e) {
    const street1 = e.target.value
    setSelectedAddress({...selectedAddress, street1})
}
function handleStreet2Change(e) {
    const street2 = e.target.value
    setSelectedAddress({...selectedAddress, street2})
}
function handleCityChange(e) {
    const city = e.target.value
    setSelectedAddress({...selectedAddress, city})
}
function handleStateChange(e) {
    const state = e.target.value
    setSelectedAddress({...selectedAddress, state})
}
function handleZipChange(e) {
    const zip = e.target.value
    setSelectedAddress({...selectedAddress, zip})
}

function handleAddressSelectChange(e){
    setSelectedAddress(addresses.find(a=>a.id == e.target.value))
}
function handleEditButton(){
    setUserIsEditingAddress(true)

}
function handleNewButton() {
    setUserIsCreatingNewAddress(true)

}
function handleSaveButton() {
    if (!selectedAddress.street1) {
        alert("Street address is required")
        return
    }
    if (!selectedAddress.city) {
        alert("City is required")
        return
    }
    if (selectedAddress.state.length < 2) {
        alert("Invalid state")
        return
    }
    if (parseInt(selectedAddress.zip).toString().length < 5) {
        alert("Invalid zip")
        return
    }
    if(userIsEditingAddress) {
        updateAddress(  //this function requires all fields to be explicitly stated in args
            token,
            selectedAddress.id,
            user.id,
            '',
            selectedAddress.street1,
            selectedAddress.street2,
            selectedAddress.city,
            selectedAddress.state,
            selectedAddress.zip
            )

        setAddresses([selectedAddress, addresses?.filter(a => a.id !== selectedAddress.id)])
        setUserIsEditingAddress(false);
    }
    else {
        (async () => {
        const newAddress = await createAddress(
            token,
            user.id,
            '',
            selectedAddress.street1,
            selectedAddress.street2,
            selectedAddress.city,
            selectedAddress.state,
            selectedAddress.zip)
        setSelectedAddress(newAddress)
        setAddresses([newAddress,...addresses])
        })()
        setUserIsCreatingNewAddress(false);
    }
    if(!selectedAddress && addresses.length) setSelectedAddress(addreses[0])
}
  return ( 
    <>
    <h6>{firstName} {lastName}</h6>
    { userIsEditingAddress || userIsCreatingNewAddress ?
        <>
            <Row><input value={selectedAddress?.street1 || ''} placeholder="Street Address" onChange={handleStreet1Change}/></Row>
            <Row><input value={selectedAddress?.street2 || ''} placeholder="Apt/Suite/Floor" onChange={handleStreet2Change}/></Row>
            <Row>
                <input value={selectedAddress?.city || ''} placeholder="City" onChange={handleCityChange}/>
                <input value={selectedAddress?.state || ''} placeholder="ST" onChange={handleStateChange}/>
                <input value={selectedAddress?.zip || ''} placeholder="ZIP" onChange={handleZipChange}/>
            </Row>

            <Row>
                <Button variant="primary" onClick={handleSaveButton}>Save</Button>
            </Row>
        </> 
        :
        <>
            <Row>{selectedAddress?.street1}</Row>
            <Row>{selectedAddress?.street2}</Row>
            <Row>{selectedAddress?.city} {selectedAddress?.state} {selectedAddress?.zip}</Row>
            {addresses.length > 1 ?
                <select name="address" onChange={handleAddressSelectChange}>
                    {
                        addresses.map((a)=>
                            <option key={a.id} value={a.id}>{a.label ? a.label : a.street1}</option>
                        )
                    }
                </select>: <></>}
            <Row>
                <Col>
            <Button variant="primary" onClick={handleEditButton}>Edit Address</Button>
            </Col><Col>
            <Button variant="primary" onClick={handleNewButton}>New Address</Button>
            </Col>
            </Row>
        </>
    }
    </>

  )

};

export default UserAddress;
