import  React  from "react";

const Carousel = () => {

    return(
      <div id="carouselProducts" className="carousel slide" data-bs-ride="carousel" data-bs-interval='2500'>
  <div className="carousel-inner" >
    <div className="carousel-item active"  >
      <img src="https://www.wallpaperup.com/uploads/wallpapers/2014/03/30/315240/f6a86d5cfe3709663042b5482ec07336-700.jpg"  alt="First image" style={{height: '150px', width: '250px'}}></img>
      <img src="https://i.imgur.com/Pc1OGbg.jpeg"  alt="First image" style={{height: '150px', width: '250px'}}></img>
      <img src="https://blog.discogs.com/wp-content/uploads/2020/09/Metallica-%E2%80%8E%E2%80%93-No-Life-Til-Leather.jpg"  alt="First image" style={{height: '150px', width: '250px'}}></img>
    </div>
    <div className="carousel-item" >
      <img src="https://i.pinimg.com/736x/b3/74/db/b374db6c8c02441212f820bf36f51c42--wallpaper-backgrounds-vintage-retro.jpg"  alt="Second image" style={{height: '150px', width: '250px'}}></img>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Dme_motorola.jpg/1024px-Dme_motorola.jpg"  alt="First image" style={{height: '150px', width: '250px'}}></img>
      <img src="https://cdn.shopify.com/s/files/1/0168/1318/products/SAM_0054_1445x.jpg?v=1498244697"  alt="First image" style={{height: '150px', width: '250px'}}></img>
    </div>
    <div className="carousel-item" >
      <img src="https://c0.wallpaperflare.com/preview/776/812/924/blurred-background-close-up-electronics-equipment-thumbnail.jpg"  alt="Third image" style={{height: '150px', width: '250px'}}></img>
      <img src="https://i.imgur.com/D7fZRtC.jpeg"  alt="First image" style={{height: '150px', width: '250px'}}></img>
      <img src="https://media.npr.org/assets/img/2011/02/16/gettyimages_90730574-25b072eabbac11b35f0355e1aef5b96d56d30c69.jpg?s=600"  alt="First image" style={{height: '150px', width: '250px'}}></img>
    </div>
  </div>
</div>
    )

}


export default Carousel;
