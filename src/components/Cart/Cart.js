import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCartItems, getPhotoURL, deleteCartItem } from "../../api";

const Cart = (props) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartHasBeenUpdated, setCartHasBeenUpdated] = useState(false);
  const [selectedCartItemId, setSelectedCartItemId] = useState(0);

  useEffect(() => {
    let subtotal = 0;
    console.log("Reticulating splines", itemsInCart);
    for (let item of itemsInCart) {
      subtotal += item.quantity * item.price;
    }
    setCartHasBeenUpdated(false);
    setCartSubtotal(subtotal);
  }, [itemsInCart, cartHasBeenUpdated]);

  useEffect(() => {
    async function fetchCart() {
      //populate the cart with help from the API
      const cartItems = await getCartItems();
      console.log("THESE ARE THE CARTITEMS", cartItems);
      setItemsInCart(cartItems); //cartItems holds our working list in state
      setCartHasBeenUpdated(true); //to trigger re-renders when necessary
    }
    fetchCart();
  }, []);

  function handleCheckoutButton(event) {
    console.log(`Checkout button was pressed, but the
                     handler is not yet implemented`);
  }

  function handleIncrementQuantity() {
    //grab the index of the item
    const selectedItemIndex = itemsInCart.findIndex(
      (item) =>
        item.cartItemId === selectedCartItemId || item.id === selectedCartItemId
    );

    //copy the cart
    const newItems = [...itemsInCart];
    newItems[selectedItemIndex].quantity++;
    setItemsInCart(newItems);

    //if the cart is in local storage, update it there too
    if (localStorage.getItem("cartItems"))
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  function handleDecrementQuantity() {
    //grab the index of the item
    const selectedItemIndex = itemsInCart.findIndex(
      (item) =>
        item.cartItemId === selectedCartItemId || item.id === selectedCartItemId
    );
    //copy the cart
    const newItems = [...itemsInCart];
    if(newItems[selectedItemIndex].quantity>1) newItems[selectedItemIndex].quantity--;
    setItemsInCart(newItems);

    //if the cart is in local storage, update it there too
    if (localStorage.getItem("cartItems"))
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  async function deleteSelectedItem() {
    try{
    deleteCartItem(selectedCartItemId).then(success=>setCartHasBeenUpdated(success));
  
    if (!localStorage.getItem("cartItems")) {
      setItemsInCart(
        itemsInCart.filter((item) => item.cartItemId !== selectedCartItemId)
      );
      
    } else
      setItemsInCart(
        itemsInCart.filter((item) => item.id !== selectedCartItemId)
      )
      
    }
    catch(error) {throw error
    }
  }

  function handleDeleteItem(event) {
    deleteSelectedItem();
    setCartHasBeenUpdated(!cartHasBeenUpdated);
    setCartSubtotal(0)
  }

  const backgroundStyle = {
    //scale the background image to 100% of viewport height
    backgroundImage:
      "url(https://picjumbo.com/wp-content/uploads/pile-of-cd-compact-discs-and-dvds-2-2210x1474.jpg)",
    height: "100vh",
  };

  return (
    //TODO: Add in an editable quantity field in the output
    <div className="bg-image" style={backgroundStyle} id="cartPage">
      <div id="cartInternalHeader">
        <div id="cartTitle">
          <h4>Your Cart:</h4>
        </div>
      </div>
      {!itemsInCart?.length 
      ?
        <img src="/images/emptyCart.png" alt="empty cart"></img>
      : (
        <div id="cartItems">
          {itemsInCart.map((item) => {
            return (
              <div className="card mb-3" key={`cartItem${item.id}`}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-2">
                      <img
                        className="item-image"
                        src={
                          item.photos?.length
                            ? item.photos[0].url
                            : item.images[0].url
                        }
                        alt={`product ${item.product_id}`}
                        style={{ cursor: "pointer" }}
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="col-8">
                      <div className="row">
                        <h5>{item.name}</h5>
                      </div>
                      <div className="row">
                        <h5>{item.price}</h5>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="row">
                        <div className="col-8">
                          <h5>Qty: {item.quantity}</h5>
                        </div>
                        <div className="col-4"></div>
                        <div className="row">
                          <a
                            onMouseDown={() =>
                              setSelectedCartItemId(item.cartItemId || item.id)
                            }
                            onClick={handleIncrementQuantity}
                            style={{ color: "green" }}
                          >
                            <i className="fas fa-solid fa-plus"></i>
                          </a>
                          <a
                            onMouseDown={() =>
                              setSelectedCartItemId(item.cartItemId || item.id)
                            }
                            onClick={handleDecrementQuantity}
                            style={
                              item.quantity > 1
                                ? { color: "red" }
                                : { color: "cecece" }
                            }
                          >
                            <i className="fas fa-solid fa-minus"></i>
                          </a>
                        </div>
                        <div className="row"></div>

                        <a
                          onMouseDown={() =>
                            setSelectedCartItemId(item.cartItemId || item.id)
                          }
                          onClick={handleDeleteItem}
                          style={{ color: "#cecece" }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="card text-end">
            <p
              className="text-end"
              id="cartTotal"
            >{`Total: $${cartSubtotal}`}</p>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={handleCheckoutButton}
            >
              Proceed to Checkout
            </button>
          </div>
          <br></br>
        </div>
      )}
    </div>
  );
};

export default Cart;
