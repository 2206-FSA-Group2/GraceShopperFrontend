import  React  from "react";
import CarouselCards from "./CarouselCards";
import Footer from "./Footer";




const Homepage = () => {

    return (

        <div>
        <div>
            <h1 style={{backgroundColor: 'black', color: 'white'}}>Welcome to NAME TO BE DEFINED</h1>
        </div>
            <div style={{backgroundColor: '#3B6978'}}>
              <CarouselCards/>
            </div>

            <div>
              <Footer/>
            </div>
        </div>
        )
}


export default Homepage;