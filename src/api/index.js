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
    const response = await fetch(`${BASE}products/categories`, {
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

