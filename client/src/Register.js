import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './App.css';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      city: '',
      country: '',
      confirmedPass: '',
      interests: [],
      groups: [],
      redirectTOhome: false, isError: false,
      sportsFitnes: false, learning: false,
      foodDrinks: false, music: false,
      film: false, arts: false, books: false,
      dance: false, dogWalking: false,
      maternityLeave: false, fashionShopping: false,
      hobbiesCrafts: false
    };

    this.tempInterests=[];

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleChange = (event) => {
    this.setState({
      [event.target.name]: true
    })
  }

  onSubmit = () => {
    // let interests = [...this.state.interests];
    for (let key in this.state) {
      if (this.state[key] === true) {
        this.tempInterests.push(key);
        // console.log("key" ,key);
      }
    }
    // this.setState({interests: interests})

    // axios.post('/users/register', data)
    //   .then(res => {
    //     console.log(res.data)
    //   }).catch(err =>{
    //     console.log(err);

    //   })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  register = () => {
    this.onSubmit();
    this.setState({ isError: false });
    axios.post('/users/register', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmedPass: this.state.confirmedPass,
      city: this.state.city,
      country: this.state.country,
      interests:this.tempInterests,
      groups: this.state.groups,
    })
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          this.setState({ redirectTOhome: true });
          console.log(res.status);
        } else {
          this.setState({ isError: true })
          console.log(`error code : ${res.status}`);
        }

      })
      .catch(err => {
        this.setState({ isError: true })
        console.log(err);
      })
  }



  render() {
    const disabled = this.state.password !== this.state.confirmedPass;

    // if (this.state.redirectTOhome) {
    //   return <Redirect to="/" />
    // }
    // if (this.state.isError) {
    //   alert('user alrady exist, please login');
    //   return <Redirect to="/login/" />
    // }

    return (
      <div className="registerComponent">

        <input
          type="text"
          name="name"
          placeholder="Enter your Name"
          // value={this.state.name}
          onChange={this.handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          // value={this.state.email}
          onChange={this.handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="Enter your City"
          // value={this.state.city}
          onChange={this.handleChange}
          required
        />

        <input
          type="text"
          name="country"
          placeholder="Enter your State"
          // value={this.state.country}
          onChange={this.handleChange}
          required
        />

        <div id="list1" className="dropdown-check-list" tabIndex="100">
          <span className="anchor">Pick your interests :</span> <br /><br />

          <form onSubmit = {this.onSubmit}>
            <input
              type="checkbox"
              name="sportsFitnes"
              onChange={this.toggleChange}
            />Sports & Fitnes <br />
            <input
              type="checkbox"
              name="learning"
              onChange={this.toggleChange}
            />Learning <br />
            <input
              type="checkbox"
              name="foodDrinks"
              onChange={this.toggleChange}
            />Food & Drinks <br />
            <input
              type="checkbox"
              name="music"
              onChange={this.toggleChange}
            />Music <br />
            <input
              type="checkbox"
              name="film"
              onChange={this.toggleChange}
            />Film <br />
            <input
              type="checkbox"
              name="arts"
              onChange={this.toggleChange}
            />Art <br />
            <input
              type="checkbox"
              name="books"
              onChange={this.toggleChange}
            />Books <br />
            <input
              type="checkbox"
              name="dance"
              onChange={this.toggleChange}
            />Dance <br />
            <input
              type="checkbox"
              name="dogWalking"
              onChange={this.toggleChange}
            />Dog Wallking <br />
            <input
              type="checkbox"
              name="maternityLeave"
              onChange={this.toggleChange}
            />Maternity leave <br />
            <input
              type="checkbox"
              name="fashionShopping"
              onChange={this.toggleChange}
            />Fashion & Shopping <br />
            <input
              type="checkbox"
              name="hobbiesCrafts"
              onChange={this.toggleChange}
            />Hobbies & Crafts <br /><br />

          </form>

        </div>

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          // value={this.state.password}
          onChange={this.handleChange}
          required
        />

        <input
          type="password"
          name="confirmedPass"
          id="confirm"
          placeholder="Confirm your Password"
          // value={this.state.confirmedPass}
          onChange={this.handleChange}
          required
        />

        {disabled ? <p style={{ color: 'red' }}>Passwords don't match</p> : null}
        <button type="button" onClick={this.register} disabled={disabled} >Register</button>


      </div>
    );
  }
}
