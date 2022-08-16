import  React  from "react";

const Carousel = () => {
let myCarousel = document.querySelector('MyCarousel')

    return(
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel" data-bs-interval='5000'>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://www.wallpaperup.com/uploads/wallpapers/2014/03/30/315240/f6a86d5cfe3709663042b5482ec07336-700.jpg" className="d-block w-100" alt="First image"></img>
      {/* <div className="carousel-caption ">
        <h5>First slide label</h5>
        <p>Lorem ipsum this price</p>
      </div> */}
    </div>
    <div className="carousel-item">
      <img src="https://i.pinimg.com/736x/b3/74/db/b374db6c8c02441212f820bf36f51c42--wallpaper-backgrounds-vintage-retro.jpg" className="d-block w-100" alt="Second image"></img>
      {/* <div className="carousel-caption ">
        <h5>Second slide label</h5>
        <p>Last one in stock</p>
      </div> */}
    </div>
    <div className="carousel-item">
      <img src="https://c0.wallpaperflare.com/preview/776/812/924/blurred-background-close-up-electronics-equipment-thumbnail.jpg" className="d-block w-100" alt="Third image"></img>
      {/* <div className="carousel-caption ">
        <h5>Third slide label</h5>
        <p>This is a steal!</p>
      </div> */}
    </div>
  </div>
</div>
    )

}


export default Carousel;
