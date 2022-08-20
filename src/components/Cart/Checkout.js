import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProfile, getMyCart, getNewGuestCart, getAddressByUserId, getsUserData, createOrder} from "../../api";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Checkout = () => {
    const [address, setAddress] = useState(null)
    const [addressIsEditable, setAddressIsEditable] = useState(true)
    const [cart,setCart] = useState(null)
    const [first,setFirst] = useState(null)
    const [last, setLast] = useState(null)
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv]= useState('');
    const [expMonth, setExpMonth] = useState('')
    const [expYear, setExpYear] = useState('')
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
        console.log(getDisplayName())
    },[])

    async function getMyAddress() {
        const myAddress = await getAddressByUserId(user.id)
        setAddress(myAddress)
        setAddressIsEditable(false)
        const profile = await getProfile(localStorage.getItem("token"))
        setFirst(profile.first)
        setLast(profile.last)

    }
    async function getInfoAboutMyCartFromApi() {
            const myCart = user ?
                await getMyCart()
                :
                await getNewGuestCart()
            console.log("here's my cart",myCart)
            let subtotal = 0;
            for (const item of myCart.items) {
                subtotal+=item.price * item.quantity
            }
            myCart.subtotal = subtotal;
            setCart(myCart)
    }

    function handlePaymentForm(e) {
        e.preventDefault
    }

    function handleCardNumber(e) {
        setCardNumber(parseInt(e.target.value).toString())
    }

    function handleCvv(e) {
        setCvv(parseInt(e.target.value).toString())
    }

    function handleMonth(e) {
        setExpMonth(e.target.value)
    }

    function handleYear(e) {
        setExpYear(e.target.value)
    }

    function handlePayButton() {
        if (cardNumber.length < 16) {
            alert("Check card number")
            return
        }
        if (cvv.length < 3) {
            alert("Check cvv")
            return
        }
        if (expMonth === '' || expYear === '') {
            alert("Please fill in expiration date")
            return
        }

        createTheOrder();
    }
    async function createTheOrder(){
        try{
            const newOrder = await createOrder(cart.id, 1)
            setCardNumber('')
            setCvv('')
        }catch(error){throw error}

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
            const data=await getsUserData(token);
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
                     `${first} ${last}`
                     :<>
                     <input placeholder="First" onChange={handleFirstChange} style={{width:"45%"}}></input>
                     <input placeholder="Last" onChange={handleLastChange} style={{width:"45%"}}></input></>
                    }
                </Row>
                <Row>
                    {addressIsEditable || !address ?
                    <input value = {address?.street1} placeholder="Street Address 1" onChange={handleStreet1Change}></input>
                    :
                    address.street1}

                </Row>
                <Row>
                {addressIsEditable || !address ?
                    <input value = {address?.street2} placeholder="Street Address 2" onChange={handleStreet2Change}></input>
                    :
                    address.street2}

                </Row>
                <Row>
                {addressIsEditable || !address ?
                    <input value = {address?.city} style={{width: "50%"}} id="cityInput" placeholder="City" onChange={handleCityChange}></input>
                    :
                    address.city}

                {addressIsEditable || !address ?
                    <input value = {address?.state} style={{width: "10%"}}placeholder="ST" onChange={handleStateChange}></input>
                    :
                    address.state}
                {addressIsEditable || !address ?
                    <input value = {address?.zip} style={{width:"20%"}} placeholder="ZIP Code" onChange={handleZipChange}></input>
                    :
                    address.zip}

                </Row>
                <Button variant="primary" onClick={handleSubmitAddressButton}>{addressIsEditable?"Save Address": "Edit Address"}</Button>
                </Col>

            
        <Col>
                <Row>
                    <h4>Payment Information</h4>
                </Row>
                <form onSubmit = {handlePaymentForm}>
                <Row>
                    <input className = "cardNumberInput" placeholder="1234 1234 1234 1234" maxLength="16" onChange={handleCardNumber} value={cardNumber}></input>
                </Row>
                    <input className = "cvvInput" placeholder = "CVV" maxLength="3" onChange={handleCvv} value={cvv}></input>
                    <select name="expMonth" id="expMonth" onChange = {handleMonth}>
                        <option value = ''>MM</option>
                        <option value = '01'>01</option>
                        <option value = '02'>02</option>
                        <option value = '03'>03</option>
                        <option value = '04'>04</option>
                        <option value = '05'>05</option>
                        <option value = '06'>06</option>
                        <option value = '07'>07</option>
                        <option value = '08'>08</option>
                        <option value = '09'>09</option>
                        <option value = '10'>10</option>
                        <option value = '11'>11</option>
                        <option value = '12'>12</option>
                    </select>
                    <select name="expYear" id="expYear" onChange={handleYear}>
                        <option value = ''>YY</option>
                        <option value = '22'>22</option>
                        <option value = '23'>23</option>
                        <option value = '24'>24</option>
                        <option value = '25'>25</option>
                        <option value = '26'>26</option>
                        
                    </select>
                </form>
                <Row>
                    <Button type="submit" variant="primary" onClick={handlePayButton}>Pay {cart?.subtotal}</Button>
                </Row>

                </Col>
            
            </Row>
        </div>
    )

}

export default Checkout