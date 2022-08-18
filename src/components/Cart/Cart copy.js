import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCartItems, getPhotoURL,deleteCartItem } from "../../api";

const Cart = (props) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartHasBeenUpdated, setCartHasBeenUpdated] = useState(false);
  const [selectedCartItemId, setSelectedCartItemId] = useState(0);

  useEffect(() => {
    let subtotal = 0;
    console.log("Reticulating splines", itemsInCart)
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
  async function deleteSelectedItem() {
    const deleteWasSuccessful = await deleteCartItem(selectedCartItemId);
    if (!localStorage.getItem("cartItems")) {
      setItemsInCart(
        itemsInCart.filter((item) => item.cartItemId !== selectedCartItemId)
      );
    } else setItemsInCart(itemsInCart.filter((item) => item.id !== selectedCartItemId))
  }

  function handleDeleteItem(event) {
    deleteSelectedItem();
    setCartHasBeenUpdated(!cartHasBeenUpdated);
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
      {!itemsInCart?.length ? null : (
        <div id="cartItems">
          {itemsInCart.map((item) => {
            return (
              <div className="card mb-3" key={`cartItem${item.id}`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
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
                    <div className="ms-3">
                      <h5>{item.name}</h5>
                    </div>
                    <div>
                      <h5 className="mb-0">{item.price}</h5>
                    </div>
                    <a
                      onMouseDown={() => setSelectedCartItemId(item.cartItemId || item.id)}
                      onClick={handleDeleteItem}
                      style={{ color: "#cecece" }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </a>
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
