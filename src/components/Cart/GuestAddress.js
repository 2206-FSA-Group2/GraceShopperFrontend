import { useState } from "react";
import { createGuestAddress, updateAddress } from "../../api";
import { Row, Col, Button } from "react-bootstrap";

const GuestAddress = ({ setOrderAddressId }) => {
  const [userIsEditingAddress, setUserIsEditingAddress] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function handleFirstChange(e) {
      setFirstName(e.target.value)
  }

  function handleLastChange(e) {
      setLastName(e.target.value)
  }
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

  function handleSaveButton() {
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
    if (selectedAddress.id) {
      updateAddress(
        //this function requires all fields to be explicitly stated in args
        0,
        selectedAddress.id,
        user.id,
        "",
        selectedAddress.street1,
        selectedAddress.street2,
        selectedAddress.city,
        selectedAddress.state,
        selectedAddress.zip
      );

      setOrderAddressId(selectedAddress.id);
    } else {
      (async () => { 
        alert("Your address has been added.")
        const newAddress = await createGuestAddress(
          selectedAddress
        );
        setSelectedAddress(newAddress);
        setOrderAddressId(newAddress.id)
      })();
      setUserIsEditingAddress(false);
      setOrderAddressId(selectedAddress.id);
    }
  }
  return (
    <>
    <div className="container-fluid rounded border" style={{ margin: "0 auto", padding: "1rem", maxWidth: "800px", backgroundColor: "white"}}>
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
                  <form role="form">
                  <div className="form-group">
                  <input
                style={{width: "50%"}}
                className="form-control form-control-large"
              value={firstName}
              placeholder="First Name"
              onChange={handleFirstChange}
            />
            <input
              value={lastName}
              style={{width: "50%"}}
              className="form-control form-control-large"
              placeholder="Last Name"
              onChange={handleLastChange}
            />
            </div>
                    <div className="form-group">
                      <label htmlFor="inputname"><b>Name</b></label>
                      <input type="text" className="form-control form-control-large" id="inputname2" placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAddress1"><b>Street address 1</b></label>
                      <input type="text" className="form-control form-control-large" id="inputAddress12" placeholder="Enter address"   onChange={handleStreet1Change}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAddress2"><b>Street address 2</b></label>
                      <input type="text" className="form-control form-control-large" id="inputAddress22" placeholder="Enter address"  onChange={handleStreet2Change}/>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="inputZip"><b>ZIP Code</b></label>
                          <input type="text" className="form-control form-control-small" id="inputZip2" placeholder="Enter zip"  onChange={handleZipChange}/>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-group">
                          <label htmlFor="inputCity"><b>City</b></label>
                          <input type="text" className="form-control" id="inputCity2" placeholder="Enter city"  onChange={handleCityChange}/>
                        </div>Name
                      </div>
                    </div>
                    <div className="form-group">
                    <label htmlFor="inputSt"><b>State</b></label>
                      <input type="text" className="form-control" id="inputSt2" onChange={handleStateChange} placeholder="State"/>
                    </div>
                  </form>
                  <button className="btn btn-primary btn-sm m-1" onClick={handleSaveButton}>Save Address</button>
                </div>
              </div>
          </div>
        </div>
        </div>
    </>
  );
};

export default GuestAddress;
