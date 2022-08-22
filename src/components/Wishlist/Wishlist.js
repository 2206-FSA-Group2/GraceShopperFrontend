import React, {useState, useEffect} from "react";
import { getProductById, getWishlistItems, removeItemFromWishlist } from "../../api";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../api";
import LoadingScreen from "../LoadingPage/LoadingScreen";

const Wishlist = () => {
    const [wishlistData, setWishlistData] = useState([])
    const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
    if (!token) return <UnauthorizedRoute />
    const [addedItem, setAddedItem] = useState(false)
    const [counter, setCounter] = useState(0)

    let selectedProduct={};

    async function addItemToCart(event) {
        try {
        event.preventDefault();
        if(await addProductToCart(selectedProduct)) {
        await removeItemFromWishlist(selectedProduct.id, token)
        setCounter(counter + 1)
        setAddedItem(true)
        }
        } catch(error) {throw error}
      }

    async function deleteItemFromWishlist(event){
        try {
            event.preventDefault();
            await removeItemFromWishlist(selectedProduct.id, token)
            setCounter(counter + 1)             
            } catch(error) {throw error}
    }

    useEffect(()=>{
        async function getData() {
            const data = await getWishlistItems(token)
            let arrItems = []
            data.map((product)=>{arrItems.push(product.product_id)})
            const items = await Promise.all(arrItems.map(getProductById))            
            setWishlistData(items);
          }
          getData();
          setTimeout(() => setLoading(false), 2000)
    }, [counter])

    return (<>
     {
        addedItem && <div
                    className="alert alert-primary text-center w-25"
                    role="alert"
                    style={{zIndex: "3", position: "absolute", left: "40%", top: "35%"}}
                  >
                    Your item has been added to the cart!
                    <button
                      type="button"
                      className="btn-close ms-5"
                      aria-label="Close"
                      onClick={()=>{setAddedItem(false)}}
                    ></button>
                  </div>
      }
    {
        loading === false ? <>
   
        <h1 style={{textAlign: "center", paddingTop : ".8rem"}}>Your wishlist</h1>
        <div style={{width: "50%", margin: "0 auto"}}>
        <section style={{margin: "0 auto"}}>
        {
            wishlistData.length > 0 ?
            wishlistData.map((product, idx)=>{return(
                
                <div className="item rounded border" style={{marginTop: "0.4rem", backgroundColor: "#e4eaeb"}} key={idx}>
                <div style= {{display: "inline-flex", justifyContent:"flex-end"}}>
                <span style={{marginRight: "auto"}}><b>{product.name}</b></span>
                <button
                  className="btn bi bi-cart-plus btn-primary btn-sm"
                  onMouseDown={(e)=>{e.preventDefault();selectedProduct=product}}
                  onClick={addItemToCart}
                  style={{width:"5%", margin: ".5rem"}}
                ></button>
                <button
                  className="btn bi bi-bookmark-dash btn-danger btn-sm"
                  onMouseDown={(e)=>{e.preventDefault();selectedProduct=product}}
                  onClick={deleteItemFromWishlist}
                  style={{width:"5%", margin: ".5rem"}}
                ></button>
                </div>
                <img
                  className="item-image"
                  src={product.photos[0].url}
                  alt="product-name"
                  style={{ padding: '.2rem'}}
                  width="250"
                  height="200"
                />
              <hr></hr>
              <p className="item-description">{product.description}</p>
              <small className="text-muted">Items on stock: {product.quantity_on_hand}</small>
              <div className="fact-line">
                <span className="fact-name">${product.price}</span>

              </div>
            </div>
            
            )}) : <h5 style={{margin: "0 auto", paddingTop: ".8rem", textAlign:"center"}}>You've got no items in your wishlist! </h5>
        }
        </section>
        </div>
        </>
        : <LoadingScreen />
    }
    </>)
}

export default Wishlist;