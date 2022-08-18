import React from "react";

const EditProfile = () => {
  return (
    <div class="container">
      <h1>Edit Profile</h1>

      <div class="col-md-9 personal-info">
        <h3>Personal info</h3>

        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-3 control-label">First name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value="Jane" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Last name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value="Bishop" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input
                class="form-control"
                type="text"
                value="janesemail@gmail.com"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label">Address:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" value="Address Here" />
            </div>
            <label class="col-md-3 control-label">Address 2 (Optional):</label>
            <div class="col-md-8">
              <input class="form-control" type="text" value="Ex. Unit 1" />
            </div>
            <label class="col-md-3 control-label">City:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" value="Ex. Chicago" />
            </div>
            <label class="col-md-3 control-label">Zip Code:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" value="Ex. 60601" />
            </div>
            <div class="ui-select">
            <label >State:</label>
              <select>
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="DC">DC</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label"></label>
            <div class="col-md-8">
              <input
                type="button"
                class="btn btn-primary"
                value="Save Changes"
              />
              <span></span>
              <input type="reset" class="btn btn-default" value="Cancel" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
