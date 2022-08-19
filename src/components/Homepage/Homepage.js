import  React  from "react";
import CarouselCards from "./CarouselCards";
import Footer from "./Footer";




const Homepage = () => {

    return (
      <>
      <div className="jumbotron">
  <div className="container text-center">
    <h1>Online Store</h1>      
    <p>Mission, Vission & Values</p>
    <CarouselCards/>
  </div>
</div>

<div className="container">    
  <div className="row">
    <div className="col-sm-4">
      <div className="panel panel-primary">
        <div className="panel-heading">BLACK FRIDAY DEAL</div>
        <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
      </div>
    </div>
    <div className="col-sm-4"> 
      <div className="panel panel-danger">
        <div className="panel-heading">BLACK FRIDAY DEAL</div>
        <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
      </div>
    </div>
    <div className="col-sm-4"> 
      <div className="panel panel-success">
        <div className="panel-heading">BLACK FRIDAY DEAL</div>
        <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
      </div>
    </div>
  </div>
</div>

<div className="container">    
  <div className="row">
    <div className="col-sm-4">
      <div className="panel panel-primary">
        <div className="panel-heading">BLACK FRIDAY DEAL</div>
        <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
      </div>
    </div>
    <div className="col-sm-4"> 
      <div className="panel panel-primary">
        <div className="panel-heading">BLACK FRIDAY DEAL</div>
        <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
      </div>
    </div>
    <div className="col-sm-4"> 
      <div className="panel panel-primary">
        <div className="panel-heading">BLACK FRIDAY DEAL</div>
        <div className="panel-footer">Buy 50 mobiles and get a gift card</div>
      </div>
    </div>
  </div>
</div>

<Footer/>
      </>
        )
}


export default Homepage;