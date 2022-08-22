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

        <div style={{width: "100%", height: "100%", backgroundColor:'#222620'}}>
        <div>
            <h1 style={{backgroundColor: '#D9D0C7', color: '#45788C'}}>Welcome to NAME TO BE DEFINED</h1>
        </div>
            <div style={{backgroundColor: '#D9D0C7'}}>
              <CarouselCards/>
            </div>

            <div>
              <Footer/>
            </div>
        </div>
        )
}


export default Homepage;