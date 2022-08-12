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
      if (!response.ok) {
        throw new Error('Something went Wrong');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.messsage);
    }
  }
  
  export async function loginUser(email, password) {
    try {
      const response = await fetch(`${BASE}api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error('Something went Wrong');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.messsage);
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
