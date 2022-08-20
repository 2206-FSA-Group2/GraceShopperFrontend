import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProfile, getMyCart, getNewGuestCart, getAddressByUserId} from "../../api";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Checkout = () => {
    const [address, setAddress] = useState(null)
    const [addressIsEditable, setAddressIsEditable] = useState(true)
    const [cart,setCart] = useState(null)
    const userData = localStorage.getItem("user")
    const user = userData ? JSON.parse(userData) : undefined
    const token = localStorage.getItem("token")

    useEffect(()=>{
        getInfoAboutMyCartFromApi(); //side effect: setCart
        console.log(18)
        if(localStorage.getItem("token")) {
            console.log(19)
            getMyAddress();

        }
    },[])

    async function getMyAddress() {
        const myAddress = await getAddressByUserId(user.id)
        setAddress(myAddress)
        setAddressIsEditable(false)
    }
    async function getInfoAboutMyCartFromApi() {
            const myCart = user ?
                await getMyCart()
                :
                await getNewGuestCart()
            console.log("here's my cart",myCart)
            let subtotal = 0;
            for (item in myCart.items) {
                subtotal+=item.price * item.quantity
            }
            myCart.subtotal = subtotal;
            setCart(myCart)
    }

    function handleStreet1Change(e) {
        const street1 = e.target.value
        setAddress({...address, street1})
    }
    function handleStreet2Change(e) {
        const street2 = e.target.value
        setAddress({...address, street2})
    }
    function handleCityChange(e) {
        const city = e.target.value
        setAddress({...address, city})
    }
    function handleStateChange(e) {
        const state = e.target.value
        setAddress({...address, state})
    }
    function handleZipChange(e) {
        const zip = e.target.value
        setAddress({...address, zip})
    }
    function handleSubmitAddressButton() {
        if (!addressIsEditable) {
            setAddressIsEditable(true)

        }
        else {
            //edit the address in the db

            setAddressIsEditable(false)
        }
    }
    function handleFirstChange() {}
    function handleLastChange() {}
    
    function getDisplayName() {
        async function retrieveProfileData() {
            const data=await getProfile(token);
            return data;
        }
        const profileData=retrieveProfileData()
        console.log("Profile data",profileData)
    }
    return (
        <div className="card">
            <Row>
                <Col>
                <Row>
                    <h4>Delivery Details</h4>
                    </Row>
                <Row>
                    {user
                    ?<h5 id="checkoutEmail"><strong>{user.email}</strong></h5>
                    :<h5 id="checkoutEmail">Checking out as GUEST</h5>}

                </Row>
                <Row>
                    {user
                     ?
                    getDisplayName()
                     :<>
                     <input placeholder="First" onChange={handleFirstChange} style={{width:"45%"}}></input>
                     <input placeholder="Last" onChange={handleLastChange} style={{width:"45%"}}></input></>
                    }
                </Row>
                <Row>
                    {addressIsEditable || !address ?
                    <input value = {address.street1} placeholder="Street Address 1" onChange={handleStreet1Change}></input>
                    :
                    address.street1}

                </Row>
                <Row>
                {addressIsEditable || !address ?
                    <input value = {address.street2} placeholder="Street Address 2" onChange={handleStreet2Change}></input>
                    :
                    address.street2}

                </Row>
                <Row>
                {addressIsEditable || !address ?
                    <input value = {address.city} style={{width: "50%"}} id="cityInput" placeholder="City" onChange={handleCityChange}></input>
                    :
                    address.city}

                {addressIsEditable || !address ?
                    <input value = {address.state} style={{width: "10%"}}placeholder="ST" onChange={handleStateChange}></input>
                    :
                    address.state}
                {addressIsEditable || !address ?
                    <input value = {address.zip} style={{width:"20%"}} placeholder="ZIP Code" onChange={handleZipChange}></input>
                    :
                    address.zip}

                </Row>
                <Button variant="primary" onClick={handleSubmitAddressButton}>{addressIsEditable?"Save Address": "Edit Address"}</Button>
                </Col>

            <Col>
        
                <Row>
                    <h4>Payment Information</h4>
                </Row>
                <Row>
                    <h5>This is where the stripe stuff goes</h5>
                </Row>

            
            </Col>
            </Row>
        </div>
    )

}

export default Checkout