import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getMyCart,
  getNewGuestCart,
  getsUserData,
  createOrder,
  getAddressByUserId,
} from "../../api";
import UserAddress from "./UserAddress";
import GuestAddress from "./GuestAddress";

const Checkout = () => {
  const [orderAddressId, setOrderAddressId] = useState(null);
  const [cart, setCart] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [addressesAreLoaded, setAddressesAreLoaded] = useState(false);
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : undefined;
  const navigate = useNavigate();

  useEffect(() => {
    getInfoAboutMyCartFromApi(); //side effect: setCart
    if (user) {
      (async () => {
        const existingAddresses = await getAddressByUserId(
          localStorage.getItem("token"),
          user.id
        );
        setAddresses(existingAddresses);
      })();
    }
  }, []);

  useEffect(() => {
    setAddressesAreLoaded(true);
  }, [addresses]);

  async function getInfoAboutMyCartFromApi() {
    const myCart = user ? await getMyCart() : await getNewGuestCart();
    let subtotal = 0;
    for (const item of myCart.items) {
      subtotal += item.price * item.quantity;
    }
    myCart.subtotal = subtotal;
    setCart(myCart);
  }

  function handlePaymentForm(e) {
    e.preventDefault;
  }

  function handleCardNumber(e) {
    setCardNumber(parseInt(e.target.value).toString());
  }

  function handleCvv(e) {
    setCvv(parseInt(e.target.value).toString());
  }

  function handleMonth(e) {
    setExpMonth(e.target.value);
  }

  function handleYear(e) {
    setExpYear(e.target.value);
  }

  function handlePayButton(e) {
    e.preventDefault();
    if (cardNumber.length < 16) {
      alert("Check card number");
      return;
    }
    if (cvv.length < 3) {
      alert("Check cvv");
      return;
    }
    if (expMonth === "" || expYear === "") {
      alert("Please fill in expiration date");
      return;
    }

    createTheOrder();
  }
  async function createTheOrder() {
    try {
      const newOrder = await createOrder(cart.id, orderAddressId);
      setCardNumber("");
      setCvv("");
      cleanup(newOrder);
    } catch (error) {
      throw error;
    }
  }
  function cleanup(order) {
    if (localStorage.getItem("cartItems")) localStorage.clear("cartItems");
    navigate("/OrderSuccess", { state: { order: order, cart: cart } });
  }

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
        Delivery Details
      </h2>

      {user ? (
        addressesAreLoaded ? (
          <UserAddress
            setOrderAddressId={setOrderAddressId}
            addresses={addresses}
            setAddresses={setAddresses}
          />
        ) : null
      ) : (
        <GuestAddress setOrderAddressId={setOrderAddressId} />
      )}

      <section
        className="payment-form dark"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <div className="container">
          <div className="block-heading">
            <h2 style={{ color: "black" }}>Payment Information</h2>
          </div>
          <form onSubmit={handlePaymentForm}>
            <div className="products">
              <h3 className="title">Checkout</h3>
              {cart
                ? cart.items.map((item, idx) => {
                    return (
                      <div className="item" key={idx}>
                        <span className="price">${item.price}</span>
                        <p className="item-name">{item.name}</p>
                        <p className="item-description">
                          Quantity: <b>{item.quantity}</b>
                        </p>
                      </div>
                    );
                  })
                : null}

              <div className="total">
                Total
                <span className="price">
                  ${Number(cart?.subtotal).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="card-details">
              <h3 className="title">Credit Card Details</h3>
              <div className="row">
                <div className="form-group col-sm-7">
                  <label htmlFor="card-holder">Card Holder</label>
                  <input
                    id="card-holder"
                    type="text"
                    className="form-control"
                    placeholder="Card Holder"
                    aria-label="Card Holder"
                  />
                </div>
                <div className="form-group col-sm-5">
                  <label htmlFor="">Expiration Date</label>
                  <div className="input-group expiration-date">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="MM"
                      aria-label="MM"
                      onChange={handleMonth}
                    />

                    <input
                      type="text"
                      className="form-control"
                      placeholder="YY"
                      aria-label="YY"
                      onChange={handleYear}
                    />
                  </div>
                </div>
                <div className="form-group col-sm-8">
                  <label htmlFor="card-number">Card Number</label>
                  <input
                    id="card-number"
                    type="text"
                    className="form-control"
                    placeholder="Card Number"
                    aria-label="Card Holder"
                    maxLength="16"
                    onChange={handleCardNumber}
                    value={cardNumber}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="cvc">CVC</label>
                  <input
                    id="cvc"
                    type="text"
                    className="form-control"
                    placeholder="CVC"
                    aria-label="Card Holder"
                    maxLength="3"
                    onChange={handleCvv}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handlePayButton}
                >
                  Proceed
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
