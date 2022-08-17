import  React  from "react";

const Carousel = () => {

    return(
      <div id="carouselProducts" className="carousel slide" data-bs-ride="carousel" data-bs-interval='2500' style={{height: '50px'}}>
  <div className="carousel-inner">
    <div className="carousel-item active"  style={{height: '250px'}}>
      <img src="https://www.wallpaperup.com/uploads/wallpapers/2014/03/30/315240/f6a86d5cfe3709663042b5482ec07336-700.jpg" className="d-block w-50 h-25" alt="First image" ></img>
    </div>
    <div className="carousel-item" style={{height: '250px'}}>
      <img src="https://i.pinimg.com/736x/b3/74/db/b374db6c8c02441212f820bf36f51c42--wallpaper-backgrounds-vintage-retro.jpg" className="d-block w-50  h-25" alt="Second image" ></img>
      
    </div>
    <div className="carousel-item" style={{height: '250px'}}>
      <img src="https://c0.wallpaperflare.com/preview/776/812/924/blurred-background-close-up-electronics-equipment-thumbnail.jpg" className="d-block w-50  h-25" alt="Third image" ></img>
    </div>
  </div>
</div>
    )

}


export default Carousel;
