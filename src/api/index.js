import axios from "axios";
import Cart from "../components/Cart/Cart";

const BASE = "https://whispering-peak-79661.herokuapp.com/api/";

export async function registerUser(
  email,
  password,
  firstName,
  lastName,
  isActive,
  isAdmin
) {
  try {
    const response = await fetch(`${BASE}users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        isActive: isActive,
        isAdmin: isAdmin,
      }),
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMyCart() {
  try{
    const response = await fetch(`${BASE}carts/cart`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }})
      const cart = await response.json();
      return cart[0];

  }catch(error){throw error}
}
export async function getNewGuestCart() {
  try {
    const cartItems=localStorage.getItem("cartItems")
    const data = fetch(`{BASE}carts/newguestcart`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        cartItems
      }
    })
  }catch(error) {throw error}
}

export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE}products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getProfile(token) {
  try {
    const response = await fetch(`${BASE}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Something went Wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getAllCategories() {
  try {
    const response = await fetch(`${BASE}products/all/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${BASE}products/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addProductToCart(product) {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  console.log("XXXXX", user, token, product);

  if (user) {  //db cart stuff
    console.log(user);

    try {
      //create the cartItem with the product_id , quantity and price
      const result = await fetch(`${BASE}cart_items/newcartitem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: 1,
          productId: product.id,
          price: product.price - 0,
        }),
      });
      const response = await result.json();
      console.log("139", response);
      return true;
    } catch (error) {
      throw error;
    }
  } else { //localStorage cart stuff
    let cartItems = [];
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }
    const existingIndex = cartItems.findIndex(
      (e) => e.id === product.id
    );
    if (existingIndex !== -1) console.log("that's already in the cart") 
    else  { 
    

      // if (product.quantity_on_hand > cartItems[existingIndex].quanity) {
      //   cartItems[existingIndex].quantity++;
      //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
      //   return true;
      // }
      // return false; //ordered quantity exceeds quantity on hand; fail.
    
    //product is not in cart--add it (with quantity of 1) and return
    product.quantity = 1;
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return true;
  }
}
}
export async function getCartItems() {
  let cartItems = [];
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  console.log("getCartItems user", user);
  if (user) {
    try {
      const response = await fetch(`${BASE}carts/cart/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const cartItems = await response.json();
      console.log("cartItems for registered user", cartItems);
      return cartItems[0].items;
    } catch (error) {
      throw error;
    }
  } else {
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }
  }
  return cartItems;
}

export async function deleteCartItem(cartItemId) {
  const token = localStorage.getItem("token");
  if (token) {
    //user is logged in -- call the api to destroy the cartItem
    try {
      const response = await fetch(`${BASE}cart_items/newcartitem`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: cartItemId,
        }),
      });

      return true
    } catch (error) {
      throw error;
    }
  }
  else {
    //delete the item from local storage
    let cartItems = [];
    if (!localStorage.getItem("cartItems")) return false;
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
    cartItems = cartItems.filter(item => item.id !== cartItemId);
    localStorage.setItem("cartItems",JSON.stringify(cartItems))
    return true;
    
   }
}

export async function updateCartItemQty(cartItemId, quantity) {
  const token = localStorage.getItem("token")
  if (token) {
    try{
      const response = await fetch(`${BASE}cart_items/newcartitem`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          id: cartItemId,
          quantity: quantity
        })
      })
    }catch(error){throw error}
  }
}

export async function getPhotoURL(productId) {
  try {
    if (!productId) return;
    const queryResult = await fetch(`${BASE}products/photos/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await queryResult.json();

    return result[0].url;
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(
  productId,
  newName,
  newDescription,
  newPrice,
  newStock,
  isActive,
  token
) {
  try {
    const response = await fetch(`${BASE}products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newName,
        description: newDescription,
        price: newPrice,
        quantity: newStock,
        isActive: isActive,
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProduct(productId, token) {
  try {
    const response = await fetch(`${BASE}products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getsUserData(token) {
  try {
    const response = await fetch(`${BASE}users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createProduct(
  name,
  description,
  price,
  quantity,
  isActive,
  token
) {
  try {
    const response = await fetch(`${BASE}products`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        isActive: isActive,
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}



export async function addPhotoToProduct(product_id, url, priority, token) {
  try {
    const response = await fetch(`${BASE}products/addPhoto/${product_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        product_id: product_id,
        url: url,
        priority: priority,
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addCategoryToProduct(name, product_id, token) {
  try {
    const response = await fetch(`${BASE}products/category/${product_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
        product_id: product_id,
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllUsers(token) {
  try {
    const response = await fetch(`${BASE}users/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deactivateUser(userId, token) {
  try {
    const response = await fetch(`${BASE}users/deactivation`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: userId,
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function reactivateUser(userId, token) {
  try {
    const response = await fetch(`${BASE}users/reactivation`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: userId,
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}


export async function getPurchasedCartsByUserId(token){
  try {
    const response = await fetch(`${BASE}carts/mycarts`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createAddress(token, userId, label, street1, street2, city, state, zipcode){
  try{
  const response = await fetch(`${BASE}address/createaddress`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }, 
    body: JSON.stringify({
      userId: userId,
      label: label,
      street1: street1,
      street2: street2,
      city: city,
      state: state,
      zipcode: zipcode
    }),
  });
  const result = response.json();
  return result;
} catch (error) {
  console.error(error);
  }
};

export async function updateAddress(token, addressId, userId, label, street1, street2, city, state, zipcode) {
  try {
    const response = await fetch(`${BASE}address/${addressId}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
      userId: userId,
      label: label,
      street1: street1,
      street2: street2,
      city: city,
      state: state,
      zip: zipcode
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export async function getAddressByUserId(token, userId) {
  try {
    const response = await fetch(`${BASE}address/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteAddress(token, addressId, userId){
  try {
    const response = await fetch(`${BASE}address/${addressId}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUserInfo(token, userId){
  try{
    const response = await fetch(`${BASE}users/${userId}/profile`,{
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
        const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createOrder(cartId, addressId) {
  try{
    const response = await fetch(`${BASE}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: {
        cart_id: cartId,
        address_id: addressId,
        status: "Processing"
      }
    })

  }catch(error){throw error}
}
export async function getAllOrders(token) {
  try {
    const response = await fetch(`${BASE}orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateOrder(id, status, token) {
  try {
    const response = await fetch(`${BASE}orders/updateorder`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
        status: status,
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function promoteUser(token, id){
  try {
    const response = await fetch(`${BASE}users/promote/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function createReview(product_id, rating, title, description, token) {
  try{
    const response = await fetch(`${BASE}reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, 
      body: JSON.stringify({
        product_id: product_id,
        rating: rating,
        title: title,
        description: description
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
    }
}

export async function updateUserInfo(userId, firstName, lastName, token) {
  try{
    const response = await fetch(`${BASE}users/me/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }, 
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName
      }),
    });
    const result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    console.error(error);
    }
  }

export async function addItemToWishlist(token, product_id){
  try {
    const response = await fetch(`${BASE}wishlist_items`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        product_id: product_id
      }),
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getWishlistItems(token){
  try {
    const response = await fetch(`${BASE}wishlist_items`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function removeItemFromWishlist(product_id, token){
  try {
    await fetch(`${BASE}wishlist_items/${product_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllPurchasedCarts(token) {
  try {
    const response = await fetch(`${BASE}carts/allcarts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}