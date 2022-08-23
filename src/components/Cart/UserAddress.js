//This component should only be placed in a context where a logged in user exists.

import { useEffect, useState } from "react";
import {
  createAddress,
  getAddressByUserId,
  getsUserData,
  updateAddress,
} from "../../api";
import { Row, Col, Button } from "react-bootstrap";

const UserAddress = ({ setOrderAddressId, addresses, setAddresses }) => {
  const [showAddressSelect, setShowAddressSelect] = useState(false);
  // const [addresses, setAddresses] = useState([]);
  const [userIsEditingAddress, setUserIsEditingAddress] = useState(false);
  const [userIsCreatingNewAddress, setUserIsCreatingNewAddress] =
    useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [refresh, setRefresh] = useState(false);
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
        const addressesFromApi = await getAddressByUserId(token, user.id);
        setAddresses(addressesFromApi);
      } catch (error) {
        throw error;
      } finally {
        setRefresh(!refresh);
      } //triggers re-render after addresses are back from the API--watched in the following useEffect
    })();
  }, []);
  //turn the editor on or off, depending on the presence of addresses
  useEffect(() => {
    if (addresses.length) {
      setSelectedAddress(addresses[0]);
      setUserIsCreatingNewAddress(false);
      setUserIsEditingAddress(false);
    } else setUserIsCreatingNewAddress(true);
  }, [refresh]);

  function handleStreet1Change(e) {
    const street1 = e.target.value;
    setSelectedAddress({ ...selectedAddress, street1 });
  }
  function handleStreet2Change(e) {
    const street2 = e.target.value;
    setSelectedAddress({ ...selectedAddress, street2 });
  }
  function handleCityChange(e) {
    const city = e.target.value;
    setSelectedAddress({ ...selectedAddress, city });
  }
  function handleStateChange(e) {
    const state = e.target.value;
    setSelectedAddress({ ...selectedAddress, state });
  }
  function handleZipChange(e) {
    const zip = e.target.value;
    setSelectedAddress({ ...selectedAddress, zip });
  }

  function handleAddressSelectChange(e) {
    setSelectedAddress(addresses.find((a) => a.id == e.target.value));
  }
  function handleEditButton() {
    setUserIsEditingAddress(true);
  }
  function handleNewButton() {
    setUserIsCreatingNewAddress(true);
  }
  function handleSaveButton(event) {
    if (!selectedAddress.street1) {
      alert("Street address is required");
      return;
    }
    if (!selectedAddress.city) {
      alert("City is required");
      return;
    }
    if (selectedAddress.state.length < 2) {
      alert("Invalid state");
      return;
    }
    if (parseInt(selectedAddress.zip).toString().length < 5) {
      alert("Invalid zip");
      return;
    }
    if (userIsEditingAddress) {
      updateAddress(
        //this function requires all fields to be explicitly stated in args
        token,
        selectedAddress.id,
        user.id,
        "",
        selectedAddress.street1,
        selectedAddress.street2,
        selectedAddress.city,
        selectedAddress.state,
        selectedAddress.zip
      );

      setAddresses([
        selectedAddress,
        addresses?.filter((a) => a.id !== selectedAddress.id),
      ]);
      setUserIsEditingAddress(false);
    } else {
      (async () => {
        const newAddress = await createAddress(
          token,
          user.id,
          "",
          selectedAddress.street1,
          selectedAddress.street2,
          selectedAddress.city,
          selectedAddress.state,
          selectedAddress.zip
        );
        setSelectedAddress(newAddress);
        setAddresses([newAddress, ...addresses]);
      })();
      setUserIsCreatingNewAddress(false);
    }
    if (!selectedAddress && addresses.length) setSelectedAddress(addreses[0]);
  }
  async function handleAddressChange(){
    const selectedAddress = document.querySelector('input[name="optionShipp"]:checked').value
    setOrderAddressId(selectedAddress)
  }
  return (
    <>
        <div className="container-fluid" style={{ margin: "0 auto", padding: "1rem", maxWidth: "800px"}}>
  <div className="row">
    <div className="col-md-12">
      <div className="list-group">
        <div className="list-group-item" >
        {
          addresses ? (
            addresses.map((address, idx)=>{return (
              <div className="list-group-item-heading" key={idx} >          
              <div className="row radio" >
                <div className="col-md-3">
                  <label>
                    <input type="radio" name="optionShipp" id="optionShipp1" value={address.id} onChange={handleAddressChange} style={{marginRight: "1rem"}}/>
                    {address.street1}
                  </label>
                </div>
                <div className="col-md-5">
                  <dl className="dl-small">
                    <dt>{firstName} {lastName}</dt>
                    <dd>{address.street1 || ""} {address.street2 || ""} {address.city || ""}. {address.state || ""}. {address.zip || ""}</dd>
                  </dl>
                  
                </div>
              </div>
          </div>
            )})
            
          ) : null
        }
          
        </div>
        <div className="list-group-item">
          <div className="list-group-item-heading">          
              <div className="row">
                <div className="col-md-3">
                  <div className="radio">
                    <label>
                      <input type="radio" name="optionShipp" id="optionShipp2" value="option2" defaultChecked style={{marginRight: "1rem"}}/>
                      A new address
                    </label>
                  </div>
                </div>
                <div className="col-md-9">                      
                  <form role="form" className="">
                    <div className="form-group">
                      <label htmlFor="inputname"><b>Name</b></label>
                      <input type="text" className="form-control form-control-large" id="inputname" placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAddress1"><b>Street address 1</b></label>
                      <input type="text" className="form-control form-control-large" id="inputAddress1" placeholder="Enter address"   onChange={handleStreet1Change}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAddress2"><b>Street address 2</b></label>
                      <input type="text" className="form-control form-control-large" id="inputAddress2" placeholder="Enter address"  onChange={handleStreet2Change}/>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="inputZip"><b>ZIP Code</b></label>
                          <input type="text" className="form-control form-control-small" id="inputZip" placeholder="Enter zip"  onChange={handleZipChange}/>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-group">
                          <label htmlFor="inputCity"><b>City</b></label>
                          <input type="text" className="form-control" id="inputCity" placeholder="Enter city"  onChange={handleCityChange}/>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                    <label htmlFor="inputSt"><b>State</b></label>
                      <input type="text" className="form-control" id="inputSt" onChange={handleStateChange} placeholder="State"/>
                    </div>
                  </form>
                  <button className="btn btn-primary btn-sm m-1" onClick={handleSaveButton}>Save Address</button>
                </div>
              </div>
          </div>
        </div>
      </div>           
    </div>
  </div>
</div>
<div>

      </div>
    </>
  );
};

export default UserAddress;
