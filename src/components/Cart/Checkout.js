import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProfile, getMyCart, getNewGuestCart, getAddressByUserId, getsUserData, createOrder} from "../../api";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserAddress from "./UserAddress"

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
        getDisplayName(); //setFirst & setLast are encapsulated here.
        getMyAddress();

    },[])

    async function getMyAddress() {
        // const myAddress = await getAddressByUserId(token, user.id)
        // console.log("myAdress came back as",myAddress)
        // setAddress(myAddress[0])
        // setAddressIsEditable(false)
        // const profile = await getProfile(localStorage.getItem("token"))
        // setFirst(profile.first)
        // setLast(profile.last)

    }
    async function getInfoAboutMyCartFromApi() {
            const myCart = user ?
                await getMyCart()
                :
                await getNewGuestCart()
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
        //the following function is immediately invoked
        (async () => {
            const data=await getsUserData(token);
            setFirst(data.first); setLast(data.last);
            return data;

        })()
    }
    return (
        <div className="card">
            <Row>
                <Col>
                <Row>
                    <h4>Delivery Details</h4>
                </Row>
                <UserAddress />
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