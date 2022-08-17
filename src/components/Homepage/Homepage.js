import  React  from "react";
import { Link, useNavigate } from 'react-router-dom'

import Carousel from "./Carousel";
import CarouselCards from "./CarouselCards";
import SalesCarousel from "./SalesCarousel";



const Homepage = () => {

    return (

        <div>
        <div>
            <h1>Welcome to NAME TO BE DEFINED</h1>
        </div>

        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="https://wallpaperaccess.com/full/33336.jpg" alt="First slide"></img>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://i.pinimg.com/originals/13/5d/c1/135dc15d79500784f118f42d031c7541.jpg" alt="Second slide"></img>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://images4.alphacoders.com/764/76498.jpg" alt="Third slide"></img>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>

            <h1>Welcome to NAME TO BE DEFINED</h1>
            <div style={{backgroundColor: '#3B6978'}}>
              <CarouselCards/>
            </div>
        </div>
        )
}


export default Homepage;