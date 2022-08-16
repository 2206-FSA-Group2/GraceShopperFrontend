import  React  from "react";
import { Link, useNavigate } from 'react-router-dom'
import  Navbar  from '../Navbar/Navbar'
import Carousel from "./Carousel";


const Homepage = () => {

    return (
        <div>
        <header>
            <label>Search</label>
            <input></input>
            <button>Search</button>
            <Link to="/cart">Cart</Link>
            <i className="bi bi-cart-fill"></i>
        </header>
        <div>
            <Navbar/>
        <div>
            <h1>Welcome to NAME TO BE DEFINED</h1>
        </div>
<section>
        <div>
            <Carousel/>
        </div>
</section>
<section>
        <div>
            <h1>Categories</h1>
        </div>
</section>
        </div>
        </div>
        )
}


export default Homepage;