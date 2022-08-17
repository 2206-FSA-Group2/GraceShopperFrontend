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
  if (false && userIsLoggedIn) {
    //CHANGE THIS CONDITIONAL ONCE userIsLoggedIn is a thing
    //do the db stuff
  } else {
    console.log("ADDINGPRODUCT",product)
    let cartItems = [];
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }
    const existingIndex = cartItems.findIndex((e) => e.product_id === product.id);
    if (existingIndex !== -1) {
      //product is already in cart--increment quantity if possible
      if (product.quantity_on_hand > cartItems[existingIndex].quanity) {
        cartItems[existingIndex].quantity++;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        return true;
      }
      return false; //ordered quantity exceeds quantity on hand; fail.
    }
    //product is not in cart--add it (with quantity of 1) and return
    cartItems.push({
      name: product.name,
      product_id: product.id,
      price: product.price,
      quantity: 1,
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return true;
  }
}

export async function getCartItems() {
  let cartItems = [];
  if (false && userIsLoggedIn) {
    //CHANGE THIS CONDITIONAL ONCE userIsLoggedIn is a thing
    //do the db stuff
  } else {
    
    if (localStorage.getItem("cartItems")) {
      cartItems = JSON.parse(localStorage.getItem("cartItems"));
    }
  }
  return cartItems;
}

export async function getPhotoURL(productId) {
  try {
    if (!productId) alert("no product id")
      const queryResult = await fetch(`${BASE}products/photos/${productId}`,{
      headers: {
        "Content-Type": "application/json",
      }});
      const result = await queryResult.json();
      
      return result[0].url
  } catch(error){throw error}}

export async function updateProduct(productId, newName, newDescription, newPrice, newStock, isActive, token) {
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
          isActive: isActive
        }),
      }
    );
    const result = response.json()
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

export async function getsUserData(token){
  try {
    const response = await fetch(`${BASE}users/me`, {
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

export async function createProduct(name, description, price, quantity, isActive, token) {
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
        isActive: isActive
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
        priority: priority
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

export async function getAllUsers(token){
  try {
    const response = await fetch(`${BASE}users/all`, {
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

export async function deactivateUser(userId, token) {
  try {
    const response = await fetch(`${BASE}users/deactivation`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userId
        }),
      }
    );
    const result = response.json()
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
          id: userId
        }),
      }
    );
    const result = response.json()
    return result;
  } catch (error) {
    console.error(error);
  }
}