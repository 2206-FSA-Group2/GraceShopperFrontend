import  React  from "react";
import AdminHomePage from "./AdminHomePage";
import CarouselCards from "./CarouselCards";
import Footer from "./Footer";




const Homepage = () => {
  const userData = localStorage.getItem("user")
  const user = JSON.parse(userData)
  if (user){
    if (user.isAdmin){
      return <AdminHomePage />
    }
  }

    return (

        <div style={{width: "100%", height: "100%"}}>
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