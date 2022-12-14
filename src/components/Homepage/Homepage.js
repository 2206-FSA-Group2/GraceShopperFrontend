import  React  from "react";
import AdminHomePage from "./AdminHomePage";
import CarouselCards from "./CarouselCards";
import Footer from "./Footer";




const Homepage = (props) => {
  const {featuredProducts} = props
  const userData = localStorage.getItem("user")
  const user = JSON.parse(userData)
  if (user){
    if (user.isAdmin){
      return <AdminHomePage />
    }
  }
    return (<> 
    <div className="container" style={{height: "400px"}}>      
        <div className="row justify-content-md-center">
          <div className="col-md-10">
            <div className="contents text-center">
              <h1 style={{fontFamily: "'Righteous','cursive'", fontWeight: "bolder", padding: "3rem", fontSize: "62px"}}>Obsol337</h1>
              <p  style={{fontWeight: "bold", marginBottom: "rem"}}>Bringing back the best technology from the past!</p>
            </div>
          </div>
        </div> 
      </div> 
      <section id="services" className="section">
      <div className="container">
        <div className="section-header">          
          <h2 className="section-title" >Our Products</h2>
          <hr className="lines" />
          <p className="section-subtitle">Reviving memories from your past! <br/> At the best market price.</p>
        </div>
              <CarouselCards/>
      </div>
    </section>
    <section id="team" className="section">
      <div className="container">
        <div className="section-header">          
          <h2 className="section-title">Our Team</h2>
          <hr className="lines"/>
          <p className="section-subtitle">The best team ever graduated from Fullstack Academy! <br/> Probably the best one there will ever be.</p>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6 col-xs-12">
            <div className="single-team">
              <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c2fe.png" alt="eric" width="250" height="200"/>
              <div className="team-details">
                <div className="team-inner">
                  <h4 className="team-title">Eric Loving</h4>
                  <p>Chief Technical Officer</p>

                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-xs-12">
            <div className="single-team">
              <img src="https://www.pngitem.com/pimgs/m/222-2222831_minecraft-character-art-png-download-minecraft-png-transparent.png" width="250" height="200" alt=""/>
              <div className="team-details">
                <div className="team-inner">
                  <h4 className="team-title">Christian Factoriza</h4>
                  <p>CEO & Co-Founder</p>

                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-xs-12">
            <div className="single-team">
              <img src="https://i.pinimg.com/originals/92/07/ff/9207ffff347b5a5b953a074fdd5383c7.png" width="250" height="200" alt=""/>
              <div className="team-details">
                <div className="team-inner">                  
                  <h4 className="team-title">Michael Wu</h4>
                  <p>Business Manager</p>

                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-xs-12">
            <div className="single-team">
              <img className="img-fulid" src="https://i.pinimg.com/736x/32/85/6d/32856d78544e1151325341e070662f1d.jpg" width="250" height="200" alt=""/>
              <div className="team-details">
                <div className="team-inner">
                  <h4 className="team-title">Rafael Chacin</h4>
                  <p>Graphic Designer</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
            <div>
              <Footer/>
            </div>
            </>   
        )
}


export default Homepage;