import  React  from "react";
import { Link, useNavigate } from 'react-router-dom'
import  Navbar  from '../Navbar/Navbar'
import Carousel from "./Carousel";
import CarouselCards from "./CarouselCards";
import SalesCarousel from "./SalesCarousel";


const Homepage = () => {

    return (
        <div >
        <header>
            <label>Search</label>
            <input></input>
            <button>Search</button>
            <Link to="/cart">Cart</Link>
            <i className="bi bi-cart-fill"></i>
        </header>
        <div>
            <Navbar/>
        </div>
            <h1>Welcome to NAME TO BE DEFINED</h1>
            <div style={{backgroundColor: '#3B6978'}}>
              <CarouselCards/>
            </div>
        </div>
        )
}


export default Homepage;