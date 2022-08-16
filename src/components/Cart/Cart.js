import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCartItems, getPhotoURL } from "../../api";

const Cart = (props) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [images, setImages] = useState({});
  const [cartHasBeenUpdated, setCartHasBeenUpdated] = useState(false);
  let newImages = {};

  useEffect(() => {
    async function fetchCart() {
      const cartItems = await getCartItems();
      setItemsInCart(cartItems);
      setCartHasBeenUpdated(true);
    }
    fetchCart();
  }, []);

  useEffect(() => {
    async function fetchImgURL({ product_id }) {
      if (!images[product_id]) {
        const result = await getPhotoURL(product_id);
        newImages[product_id] = result;
        console.log(`Setting image for product ${product_id}`, newImages);
        setImages(newImages);
      }
    }

    let subtotal = 0;
    for (let item of itemsInCart) {
      subtotal += item.quantity * item.price;
      fetchImgURL(item);
    }
    setCartHasBeenUpdated(false);
    setCartSubtotal(subtotal);
  }, [itemsInCart, cartHasBeenUpdated]);

  function handleCheckoutButton(event) {
    console.log(`Checkout button was pressed, but the
                     handler is not yet implemented`);
  }
  
  function handleDeleteItem(event) {
      console.log(`Delete button has not yet been implemented`)
  }

  return (
    <div className="bg-image" style={{backgroundImage: "url(https://picjumbo.com/wp-content/uploads/pile-of-cd-compact-discs-and-dvds-2-2210x1474.jpg)"}}id="cartPage">
      <div id="cartInternalHeader">
        <div id="cartTitle">
          <h4>Your Cart:</h4>
        </div>

      </div>
      {!itemsInCart.length ? null : (
        <div id="cartItems">
          {itemsInCart.map((item) => {
            return (
              <div className="card mb-3" key={`cartItem${item.product_id}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center" >
                      <img
                        className="item-image"
                        src={images[item.product_id]}
                        alt={`product ${item.product_id}`}
                        style={{ cursor: "pointer" }}
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="ms-3">
                        <h5>{item.name}</h5>
                    </div>
                    <div >
                        <h5 className="mb-0">{item.price}</h5>
                    </div>
                     <a onClick={handleDeleteItem} style={{color: "#cecece"}}><i className="fas fa-trash-alt"></i></a> 
                  </div>
                </div>
              </div>
            );
          
          })}
          <div className="card text-end">
            <p className="text-end" id="cartTotal">{`Total: $${cartSubtotal}`}</p>
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={handleCheckoutButton}>
          Proceed to Checkout
        </button>
          </div><br></br>
          
        </div>
      )}
    </div>
  );
};

export default Cart;
