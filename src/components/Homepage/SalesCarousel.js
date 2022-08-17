import  React  from "react";

const SalesCarousel = () => {

    return(
      <div id="carouselSales" className="carousel slide" data-bs-ride="carousel" data-bs-interval='2500'>
  <div className="carousel-inner" >
    <div className="carousel-item active" >
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nokia_3310_Blue_R7309170_%28retouch%29.png/320px-Nokia_3310_Blue_R7309170_%28retouch%29.png"  alt="First image" style={{height: '150px', width: '250px', justifyContent: 'center'}}></img>
      <img src="https://cdn.shopify.com/s/files/1/0168/1318/products/SAM_0054_1445x.jpg?v=1498244697"  alt="First image" style={{height: '150px', width: '250px', justifyContent: 'center'}}></img>
    </div>
    <div className="carousel-item" >
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Motorola_RAZR_V3i_01.JPG/1024px-Motorola_RAZR_V3i_01.JPG"  alt="Second image" style={{height: '150px', width: '250px', justifyContent: 'center'}}></img>
      <img src="https://i.ytimg.com/vi/FuzMB5y8rOw/maxresdefault.jpg"  alt="First image" style={{height: '150px', width: '250px', justifyContent: 'center'}}></img>
      
    </div>
    <div className="carousel-item">
      <img src="https://i.imgur.com/aRZLtQ6.jpeg"  alt="Third image" style={{height: '150px', width: '250px', justifyContent: 'center'}}></img>
      <img src="https://blog.discogs.com/wp-content/uploads/2020/09/Wu-Tang-Clan-%E2%80%8E%E2%80%93-Enter-The-Wu-Tang-36-Chambers.jpg"  alt="First image" style={{height: '150px', width: '250px', justifyContent: 'center'}}></img>
    </div>
  </div>
</div>
    )

}


export default SalesCarousel;
