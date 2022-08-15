import  React  from "react";
import { Link, useNavigate } from 'react-router-dom'


const Homepage = () => {

    return (
        <div>
        <header>
            <label>Search</label>
            <input></input>
            <button>Search</button>
            <Link to="/cart">Cart</Link>
            <i class="bi bi-cart-fill"></i>
        </header>
        <div>
            <h1>Navbar placeholder</h1>
        <div>
            <h1>Welcome to NAME TO BE DEFINED</h1>
        </div>

        <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="https://wallpaperaccess.com/full/33336.jpg" alt="First slide"></img>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="https://i.pinimg.com/originals/13/5d/c1/135dc15d79500784f118f42d031c7541.jpg" alt="Second slide"></img>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="https://images4.alphacoders.com/764/76498.jpg" alt="Third slide"></img>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

        <div>
            <h1>Bye</h1>
        </div>

        </div>
        </div>
        )
}


export default Homepage;