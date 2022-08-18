import React from 'react'
import { getAddressByUserId, getProfile } from '../../api'

const Profile = () => {
    const token = localStorage.getItem('token')

    // const userInfo = await getUser
    async function profileInformation() {

        const userAddress = await getAddressByUserId(token, userId )
    }

    profileInformation();

    // const token = getLocalStorage('token')
    return(
      <div className="container emp-profile">
      <form method="post">
          <div className="row">
              <div className="col-md-4">
                  
              </div>
              <div className="col-md-6">
                  <div className="profile-head">
                        <h5>
                            FirstName Lastname
                        </h5>
                        <h5>
                            Email
                        </h5>
                        <h5>
                            Address
                        </h5>
                        <h5>
                            My Orders
                        </h5>
                        <h5>
                            My Cart
                        </h5>
                  </div>
              </div>
              <div className="col-md-2">
                  <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
              </div>
          </div>
          <div className="row">
              <div className="col-md-4">
              </div>
              <div className="col-md-8">
                  <div className="tab-content profile-tab" id="myTabContent">
                      <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Name</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>Kshiti Ghelani</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Email</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>kshitighelani@gmail.com</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Phone</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>123 456 7890</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Address</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>Web Developer and Designer</p>
                                      </div>
                                  </div>
                      </div>
                      <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Experience</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>Expert</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Hourly Rate</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>10$/hr</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Total Projects</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>230</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>English Level</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>Expert</p>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <label>Availability</label>
                                      </div>
                                      <div className="col-md-6">
                                          <p>6 months</p>
                                      </div>
                                  </div>
                          <div className="row">
                              <div className="col-md-12">
                                  <label>Your Bio</label><br/>
                                  <p>Your detail description</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </form>           
  </div>
    ) 
}

export default Profile