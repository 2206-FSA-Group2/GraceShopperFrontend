import  React  from "react";

const SalesCarousel = () => {

    return(
      <div id="carouselSales" className="carousel slide" data-bs-ride="carousel" data-bs-interval='2500' >
  <div className="carousel-inner">
    <div className="carousel-item active" style={{height: '250px'}}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nokia_3310_Blue_R7309170_%28retouch%29.png/320px-Nokia_3310_Blue_R7309170_%28retouch%29.png" className="d-block w-50  h-25" alt="First image"></img>
    </div>
    <div className="carousel-item" style={{height: '250px'}}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Motorola_RAZR_V3i_01.JPG/1024px-Motorola_RAZR_V3i_01.JPG" className="d-block w-50  h-25" alt="Second image"></img>
      
    </div>
    <div className="carousel-item" style={{height: '250px'}}>
      <img src="https://i.imgur.com/aRZLtQ6.jpeg" className="d-block w-50  h-25" alt="Third image"></img>
    </div>
  </div>
</div>
    )

}


export default SalesCarousel;
