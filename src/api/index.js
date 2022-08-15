import axios from "axios";

const BASE = "https://whispering-peak-79661.herokuapp.com/api/";


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
