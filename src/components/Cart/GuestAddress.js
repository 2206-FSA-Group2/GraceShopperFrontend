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

  function handleEditButton() {
    setUserIsEditingAddress(true);
  }
  function handleNewButton() {
    setUserIsCreatingNewAddress(true);
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
      (async () => { //todo: make a createGuestAddress route
        const newAddress = await createGuestAddress(
          selectedAddress
        );
        setSelectedAddress(newAddress);
      })();
      setUserIsEditingAddress(false);
      setOrderAddressId(selectedAddress.id);
    }
  }
  return (
    <>

      {userIsEditingAddress ? (
        <>
          <Row>
            <input
              value={firstName}
              placeholder="First Name"
              onChange={handleFirstChange}
            />
            <input
              value={lastName}
              placeholder="Last Name"
              onChange={handleLastChange}
            />
          </Row>
          <Row>
            <input
              value={selectedAddress?.street1 || ""}
              placeholder="Street Address"
              onChange={handleStreet1Change}
            />
          </Row>
          <Row>
            <input
              value={selectedAddress?.street2 || ""}
              placeholder="Apt/Suite/Floor"
              onChange={handleStreet2Change}
            />
          </Row>
          <Row>
            <input
              value={selectedAddress?.city || ""}
              placeholder="City"
              onChange={handleCityChange}
            />
            <input
              value={selectedAddress?.state || ""}
              placeholder="ST"
              onChange={handleStateChange}
            />
            <input
              value={selectedAddress?.zip || ""}
              placeholder="ZIP"
              onChange={handleZipChange}
            />
          </Row>

          <Row>
            <Button variant="primary" onClick={handleSaveButton}>
              Save
            </Button>
          </Row>
        </>
      ) : (
        <>
          <Row>{selectedAddress?.street1}</Row>
          <Row>{selectedAddress?.street2}</Row>
          <Row>
            {selectedAddress?.city} {selectedAddress?.state}{" "}
            {selectedAddress?.zip}
          </Row>
          
          <Row>
            <Col>
              <Button variant="primary" onClick={handleEditButton}>
                Edit Address
              </Button>
            </Col>
            <Col>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default GuestAddress;
