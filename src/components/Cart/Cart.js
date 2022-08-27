import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCartItems, deleteCartItem, updateCartItemQty } from "../../api";
import LoadingScreen from "../LoadingPage/LoadingScreen";

const Cart = ({ productsData }) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartHasBeenUpdated, setCartHasBeenUpdated] = useState(false);
  const [selectedCartItemId, setSelectedCartItemId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let subtotal = 0;

    for (let item of itemsInCart) {
      subtotal += item.quantity * item.price;
    }
    setCartHasBeenUpdated(false);
    setCartSubtotal(subtotal);
  }, [itemsInCart, cartHasBeenUpdated]);

  useEffect(() => {
    async function fetchCart() {
      //populate the cart from the API
      const cartItems = await getCartItems();
      setItemsInCart(cartItems); //cartItems holds our working list in state
      setCartHasBeenUpdated(true); //to trigger re-renders when necessary
    }
    fetchCart();
    // setTimeout(() => setLoading(false), 2000);
  }, []);

  function handleCheckoutButton(event) {
    navigate("../checkout", {state:{cartSubtotal,itemsInCart}});
  }//

  function handleIncrementQuantity() {
    //check on hand qty to make sure we're not overselling

    const maxQty = productsData.find(
      (item) =>
        item.name ===
        (
          itemsInCart.find(
            (cart_item) => cart_item.cartItemId === selectedCartItemId
          ) ||
          itemsInCart.find((cart_item) => cart_item.id === selectedCartItemId)
        ).name
    ).quantity_on_hand;


    //grab the index of the item
    const selectedItemIndex = itemsInCart.findIndex(
      (item) =>
        item.cartItemId === selectedCartItemId || item.id === selectedCartItemId
    );

    //copy the cart
    const newItems = [...itemsInCart];
    if (newItems[selectedItemIndex].quantity < maxQty)
      newItems[selectedItemIndex].quantity++;
    setItemsInCart(newItems);

    //if the cart is in local storage, update it there too
    if (localStorage.getItem("cartItems")) {
      localStorage.setItem("cartItems", JSON.stringify(newItems));
    }
    //otherwise, it's a remote cart -- update the quantity in the db
  }

  function handleDecrementQuantity() {
    //grab the index of the item
    const selectedItemIndex = itemsInCart.findIndex(
      (item) =>
        item.cartItemId === selectedCartItemId || item.id === selectedCartItemId
    );
    //copy the cart
    const newItems = [...itemsInCart];
    if (newItems[selectedItemIndex].quantity > 1)
      newItems[selectedItemIndex].quantity--;
    setItemsInCart(newItems);

    //if the cart is in local storage, update it there too
    if (localStorage.getItem("cartItems"))
      localStorage.setItem("cartItems", JSON.stringify(newItems));
    updateCartItemQty(selectedCartItemId, newItems[selectedItemIndex].quantity);
  }

  async function deleteSelectedItem() {
    try {
      if (localStorage.getItem("token")) deleteCartItem(selectedCartItemId);
      
    } catch (error) {
      throw error;
    } finally {
      if (!localStorage.getItem("cartItems")) {
        setItemsInCart(
          itemsInCart.filter((item) => item.cartItemId !== selectedCartItemId)
        );
      } else
        {
          let index = itemsInCart.findIndex(item=>item.id === selectedCartItemId);
          const newItems = itemsInCart.slice(0,index).concat(itemsInCart.slice(index+1,itemsInCart.length))
        
          setItemsInCart(newItems)
          localStorage.clear("cartItems")
          localStorage.setItem("cartItems",JSON.stringify(newItems))
        }
        
    }setCartHasBeenUpdated(!cartHasBeenUpdated);
  }

  function handleDeleteItem(event) {
    deleteSelectedItem();
    setCartSubtotal(0);
  }

  return (
    <>
      {loading === false ? (
        <div className="bg-image" id="cartPage">
          <div id="cartInternalHeader">
            <div id="cartTitle">
              <h4 style={{ textAlign: "center", paddingTop: ".8rem" }}>
                Your Cart
              </h4>
            </div>
          </div>

          {!itemsInCart?.length ? (
            <h5
              style={{
                margin: "0 auto",
                paddingTop: ".8rem",
                textAlign: "center",
              }}
            >
              You've got no items in your cart!{" "}
            </h5>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "50%",
                  margin: "0 auto",
                }}
              >
                <p
                  style={{
                    marginRight: "2rem",
                    marginBottom: "0",
                    paddingBottom: "0",
                  }}
                  id="cartTotal"
                >
                  Total: <b>${cartSubtotal.toFixed(2)}</b>
                </p>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleCheckoutButton}
                >
                  Proceed to Checkout
                </button>
              </div>
              <div id="cartItems" style={{ width: "50%", margin: "0 auto" }}>
                {itemsInCart.map((item, index) => {
                  return (
                    <div key={`cartItem${item.id}.${index}`}>
                      <div
                        className="item rounded border"
                        style={{
                          marginTop: "0.4rem",
                          backgroundColor: "#e4eaeb",
                        }}
                      >
                        <div className="card-body">
                          <p>
                            <b>{item.name}</b>
                          </p>
                        </div>

                        <img
                          className="item-image"
                          src={
                            item.photos?.length
                              ? item.photos[0].url
                              : item.images[0].url || null
                          }
                          alt={`product ${item.product_id}`}
                          width="250"
                          height="200"
                          style={{ margin: "0 auto" }}
                        />

                        <div style={{ display: "flex" }}>
                          <p style={{ marginRight: "auto" }}>
                            Quantity: <b>{item.quantity}</b>
                          </p>
                          <a
                            onMouseDown={() =>
                              setSelectedCartItemId(item.cartItemId || item.id)
                            }
                            onClick={handleIncrementQuantity}
                            style={{
                              color: "green",
                              cursor: "pointer",
                              fontSize: "26px",
                              padding: "0 0.5rem",
                            }}
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
                                ? {
                                    color: "red",
                                    cursor: "pointer",
                                    fontSize: "26px",
                                    padding: "0 0.5rem",
                                  }
                                : {
                                    color: "cecece",
                                    fontSize: "26px",
                                    padding: "0 0.5rem",
                                  }
                            }
                          >
                            <i className="fas fa-solid fa-minus"></i>
                          </a>

                          <a
                            onMouseDown={() =>
                              setSelectedCartItemId(item.cartItemId || item.id)
                            }
                            onClick={handleDeleteItem}
                            style={{
                              color: "#cecece",
                              cursor: "pointer",
                              fontSize: "26px",
                              color: "black",
                              padding: "0 0.5rem",
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Cart;
