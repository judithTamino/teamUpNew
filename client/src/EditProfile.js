import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./style/editProfile.css";

export default class EditProfile extends Component {
  state = {
    isUpdate: false,
    redirectTOprofile: false,
    city: this.props.location.state.userArr[0].city,
    state: this.props.location.state.userArr[0].state,
    password: this.props.location.state.userArr[0].password
  };

  editProfile = () => {
    axios
      .patch(`/users/editProfile/${localStorage.user}`, {
        city: this.state.city,
        state: this.state.state,
        password: this.state.password
      })
      .then(res => {
        if (res.status === 200) {
          console.log("Changed");
        } else {
          console.log("wrong");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.redirectTOprofile) {
      return <Redirect to="/userHomePage" />;
    }
    return (
      <div className="editProfile">
        <div className="EditProfile-Info">
          <h2 className="EditProfile-MainTitle">Edit your profile</h2>
          <label className="EditProfile-ChangeCity">
            {" "}
            <span className="EditProfile-ChangeCity-Text">Change city</span>
            <input className="EditProfile-Input"
              type="text"
              defaultValue={this.state.city}
              onChange={event => {
                this.setState({ city: event.target.value });
              }}
            ></input>
          </label>{" "}
          <label className="EditProfile-ChangeCountry">
            {" "}
            <span className="EditProfile-ChangeCountry-Text">Change country</span>
            
            <input className="EditProfile-Input"
              type="text"
              defaultValue={this.state.state}
              onChange={event => {
                this.setState({ state: event.target.value });
              }}
            ></input>
          </label>
          <label className="EditProfile-ChangePassword">
            
            <span className="EditProfile-ChangePassword-Text">Change password</span>
            <input className="EditProfile-Input"
              type="password"
              defaultValue={this.state.password}
              onChange={event => {
                this.setState({ password: event.target.value });
              }}
            ></input>
          </label>{" "}
          <br />
          <button className="EditProfile-DoneBtn"
            onClick={() => {
              this.editProfile();
              this.setState({ redirectTOprofile: true });
            }}
          >
            Done
          </button>
        </div>
      </div>
    );
  }
}
