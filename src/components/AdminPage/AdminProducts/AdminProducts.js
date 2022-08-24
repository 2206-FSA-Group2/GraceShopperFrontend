import React, { useState, useEffect } from "react";
import { addCategoryToProduct, addPhotoToProduct, createProduct, getAllCategories, getAllProducts } from "../../../api";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UnauthorizedRoute from "../../ErrorPages/UnauthorizedRoute";

const AdminProducts = () => {
  const user = localStorage.getItem("user")
  const isAdmin = JSON.parse(user)
  if (!isAdmin) return <UnauthorizedRoute/>
  const [productsData, setProductsData] = useState([]);
  const [addProduct, setAddProduct] = useState(true)
  const [addPhotos, setAddPhotos] = useState(false)
  const [newProductId, setNewProductId] = useState("")
  const [addCategory, setAddCategory] = useState(false)
  const [categoriesData, setCategoriesData] = useState([])
  const [counter, setCounter] = useState(0)
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function handleAddCategory(event){
    event.preventDefault()
    let category = event.target[0].value;
    const newCategory = event.target[1].value
    if (!category) {
      await addCategoryToProduct(newCategory, newProductId, token)
    } else {
      await addCategoryToProduct(category, newProductId, token)
    }
    setAddCategory(false)
    navigate("/admin/products")
    setAddProduct(true)
    setCounter(counter + 1)
  }

  async function handleCreateProduct(event) {
    event.preventDefault();
    let isActive = true;
    const name = event.target[0].value;
    const description = event.target[1].value;
    const price = event.target[2].value;
    const quantity = event.target[3].value;
    if (!quantity) isActive = false;
    const newProduct = await createProduct(
      name,
      description,
      price,
      quantity,
      isActive,
      token
    );
    setNewProductId(newProduct.id)
    setAddPhotos(true)
    setAddProduct(false)
  }

  async function handleAddPhotos(event){
    event.preventDefault()
    const photo1Url = event.target[0].value;
    const photo2Url = event.target[1].value;
    const photo3Url = event.target[2].value;
    let priority1 = 1
    let priority2 = 2
    let priority3 = 3
    const newPhoto1 = await addPhotoToProduct(newProductId, photo1Url, priority1, token)
    if (photo2Url) await addPhotoToProduct(newProductId, photo2Url, priority2, token)
    if (photo3Url) await addPhotoToProduct(newProductId, photo3Url, priority3, token)
    setAddPhotos(false)
    setAddCategory(true)

  }

  useEffect(() => {
    async function getData() {
      const data = await getAllProducts();
      setProductsData(data);
      const _data = await getAllCategories();
      setCategoriesData(_data)
    }
    getData();
  }, [counter]);


  return (
    <>
      <div style={{ padding: "2rem" }}>
      {addProduct &&
        <form
          className="row g-3 justify-content-center"
          style={{ marginTop: "1rem" }}
          onSubmit={handleCreateProduct}
        >
          <div className="col-auto ">
            <input
              type="text"
              className="form-control"
              id="create1"
              placeholder="Name of the new product"
            />
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="create2"
              placeholder="Description"
            />
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="create3"
              placeholder="Price"
            />
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="create4"
              placeholder="Items on Stock"
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary me-3">
              Create Product
            </button>
          </div>
        </form>
      }
      {
        addPhotos && 
        <form
          className="row g-3 justify-content-center"
          style={{ marginTop: "1rem" }}
          onSubmit={handleAddPhotos}
        >
          <div className="col-auto ">
            <input
              type="text"
              className="form-control"
              id="photo1"
              placeholder="Photo URL here"
            />
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="photo2"
              placeholder="Photo URL here"
            />
          </div>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              id="photo3"
              placeholder="Photo URL here"
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary me-3">
              Add Photos
            </button>
          </div>
        </form>
      }
      {
        addCategory && 
        <form
          className="row g-3 justify-content-center"
          style={{ marginTop: "1rem" }}
          onSubmit={handleAddCategory}
        >
          <div className="col-auto">
            <select className="form-select">
            <option defaultValue>Choose Category</option>
            {
              categoriesData.map((category, idx)=>{return(
                <option key={idx}>{category.name}</option>
              )})
            }
            </select>
          </div>
          <div className="col-auto">
          <input
              type="text"
              className="form-control"
              id="newcategory"
              placeholder="Or create a new category"
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary me-3">
              Add Category
            </button>
          </div>
        </form>
      }
      </div>
      <div style={{ padding: "2rem" }}>
        <table className="table" style={{backgroundColor: "white"}}>
          <thead>
            <tr>
              <th scope="col">Product Id</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Items on Stock</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product, idx) => {
              return (
                <tr key={idx}>
                  <th scope="row">{product.id}</th>

                  <td>
                    {" "}
                    <Link
                      to={`/admin/products/${product.id}`}
                      state={{ product: product }}
                    >
                      {product.name}{" "}
                    </Link>
                  </td>

                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity_on_hand}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminProducts;
