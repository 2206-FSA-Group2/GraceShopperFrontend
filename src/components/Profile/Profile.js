import React from 'react'
import { getProfile } from '../../api'
import { getLocalStorage } from '../../utils/utils'

const Profile = () => {

    // const token = getLocalStorage('token')
    // const profileInfo = await getProfile(token)
    // const firstName = profileInfo.firstName
    // const lastName = profileInfo.lastName
    // const email = profileInfo.email
    return(
        <section className="h-100 gradient-custom-2">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-lg-9 col-xl-7">
        <div className="card">
          <div className="rounded-top text-white d-flex flex-row" style={{backgroundColor: "#000; height:200px"}}>
            <div className="ms-4 mt-5 d-flex flex-column" style={{width: '150px'}}>
              <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark"
                style={{Zindex: '1'}}>
                Edit profile
              </button>
            </div>
            <div className="ms-3" style={{marginTop: '130px'}}>
              <h5>firstName lastName</h5>
              <p>city</p>
            </div>
          </div>
          <div className="p-4 text-black" style={{backgroundColor: "#f8f9fa"}}>
            <div className="d-flex justify-content-end text-center py-1">
              <div>
                <p className="mb-1 h5">0</p>
                <p className="small text-muted mb-0">Orders</p>
              </div>
              <div className="px-3">
                <p className="mb-1 h5">0</p>
                <p className="small text-muted mb-0">Status</p>
              </div>
              <div>
                <p className="mb-1 h5">0</p>
                <p className="small text-muted mb-0">Cart</p>
              </div>
            </div>
          </div>
          <div className="card-body p-4 text-black">
            <div className="mb-5">
              <p className="lead fw-normal mb-1">About</p>
              <div className="p-4" style={{backgroundColor: "#f8f9fa"}}>
                <p className="font-italic mb-1">Customer</p>
                <p className="font-italic mb-1">Lives in State</p>
                <p className="font-italic mb-0">StreetName</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    )
}

export default Profile