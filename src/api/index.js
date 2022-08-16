import axios from "axios";
const BASE = "https://whispering-peak-79661.herokuapp.com/api/";


export async function registerUser(email, password, firstName, lastName, isActive, isAdmin) {
    try {
      const response = await fetch(`${BASE}users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error){
      console.error (error)
    }
  }
      
export async function getAllProducts() {
    try {
      const response = await fetch(`${BASE}products`, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      const result = response.json();
      return result;

    } catch (error) {
      console.error(error);
    }
  }

  export async function getProfile(token){
    try{
        const response = await fetch(`${BASE}users/me`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Something went Wrong');
          }
          const data = await response.json();
          return data;

    } catch (error){
        console.error(error.message);
    }
  }

export async function getAllCategories(){
  try {
    const response = await fetch(`${BASE}products/all/categories`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(id){
  try {
    const response = await fetch(`${BASE}products/${id}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

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