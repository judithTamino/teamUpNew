import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./style/register.css";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      city: "",
      country: "",
      confirmedPass: "",
      interests: [],
      groups: [],
      joiningDate: new Date(),
      redirectTOprofile: false,
      isError: false,
      sportsFitnes: false,
      learning: false,
      foodDrinks: false,
      music: false,
      film: false,
      arts: false,
      books: false,
      dance: false,
      dogWalking: false,
      maternityLeave: false,
      fashionShopping: false,
      hobbiesCrafts: false
    };

    this.tempInterests = [];
    this.handleChange = this.handleChange.bind(this);
  }

  toggleChange = event => {
    this.setState({
      [event.target.name]: true
    });
  };

  onSubmit = () => {
    for (let key in this.state) {
      if (this.state[key] === true) {
        this.tempInterests.push(key);
      }
    }
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  register = () => {
    this.onSubmit();
    this.setState({ isError: false });
    axios
      .post("/users/register", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmedPass: this.state.confirmedPass,
        city: this.state.city,
        state: this.state.country,
        interests: this.tempInterests,
        groups: this.state.groups,
        joiningDate: this.state.joiningDate
      })
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          this.setState({ redirectTOprofile: true });
          window.location.reload(false);
        } else {
          this.setState({ isError: true });
          console.log(`error code : ${res.status}`);
        }
      })
      .catch(err => {
        this.setState({ isError: true });
        console.log(err);
      });
  };

  render() {
    const disabled = this.state.password !== this.state.confirmedPass;

    if (this.state.redirectTOprofile) {
      return <Redirect to="/login" />;
    }
    if (this.state.isError) {
      alert("user alrady exist, please login");
      return <Redirect to="/login/" />;
    }

    return (
      <div className="register">
        <h1 className="RegisterComponent-MainTitle">Register</h1>
        <div className="RegisterComponent">
          <input
          className="RegisterComponent-Input"
            type="text"
            name="name"
            placeholder="Enter your Name"
            onChange={this.handleChange}
            required
          />

          <input
          className="RegisterComponent-Input Email"
            type="email"
            name="email"
            placeholder="Enter your Email"
            onChange={this.handleChange}
            required
          />

          <input
          className="RegisterComponent-Input"
            type="text"
            name="city"
            placeholder="Enter your City"
            onChange={this.handleChange}
            required
          />

          <input
          className="RegisterComponent-Input"
            type="text"
            name="country"
            placeholder="Enter your State"
            onChange={this.handleChange}
            required
          />

          <div id="list1" className="checkboxCategories" tabIndex="100">
            <span className="checkboxCategories-MainTitle">Pick your interests :</span>
            <form onSubmit={this.onSubmit}>
              <input
                type="checkbox"
                name="Sports & Fitnes"
                onChange={this.toggleChange}
              />
             <span className="checkboxCategories-Intrests">Sports & Fitnes</span>  
              <input
                type="checkbox"
                name="Learning"
                onChange={this.toggleChange}
              />
              <span className="checkboxCategories-Intrests">Learning</span>  
              
              <input
                type="checkbox"
                name="Food & Drinks"
                onChange={this.toggleChange}
              />
              <span className="checkboxCategories-Intrests">Food & Drinks </span>  
              
              <input
                type="checkbox"
                name="Music"
                onChange={this.toggleChange}
              />
              <span className="checkboxCategories-Intrests"> Music </span>  
             
              <input type="checkbox" name="Film " onChange={this.toggleChange} />
              <span className="checkboxCategories-Intrests">Film </span>  
              
              <input type="checkbox" name="Art" onChange={this.toggleChange} />
              <span className="checkboxCategories-Intrests">Art </span>  
              
              <input
                type="checkbox"
                name="Books"
                onChange={this.toggleChange}
              />
              <span className="checkboxCategories-Intrests">Books</span>  
               
              <input
                type="checkbox"
                name="Dance"
                onChange={this.toggleChange}
              />
              <span className="checkboxCategories-Intrests">Dance </span>  
              
              <input
                type="checkbox"
                name="Dog Wallking"
                onChange={this.toggleChange}
              />
              <span className="checkboxCategories-Intrests">Dog Wallking </span>  
              
              <input
                type="checkbox"
                name="Maternity leave"
                onChange={this.toggleChange}
              />
              <span className="checkboxCategories-Intrests">Maternity leave </span>  
              
              <input
                type="checkbox"
                name="Fashion & Shopping"
                onChange={this.toggleChange}
              />
              <span className="checkboxCategories-Intrests">Fashion & Shopping </span>  
              
              <input
                type="checkbox"
                name="Hobbies & Crafts"
                onChange={this.toggleChange}
              />
              <span className="checkboxCategories-Intrests"> Hobbies & Crafts </span>  
            </form>
          </div>

          <input
          className="RegisterComponent-Input"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your Password"
            onChange={this.handleChange}
            required
          />

          <input
          className="RegisterComponent-Input"
            type="password"
            name="confirmedPass"
            id="confirm"
            placeholder="Confirm your Password"
            onChange={this.handleChange}
            required
          />

          {disabled ? (
            <p style={{ color: "red" }}>Passwords don't match</p>
          ) : null}
          <button type="button" onClick={this.register} disabled={disabled} className="registerButton">
            Register
          </button>
        </div>
      </div>
    );
  }
}
