import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './App.css';

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    city: '',
    country: '',
    confirmedPass: '',
    interests: [],
    groups: [],
    redirectTOhome: false, isError: false
  };


  register = () => {
    this.setState({ isError: false });
    axios.post('/users/register', {
      email: this.state.email,
      password: this.state.password,
      confirmedPass: this.state.confirmedPass,
      city: this.state.city,
      country: this.state.country,
      interests: this.state.interests,
      groups: this.state.groups
    })
      .then(res => {
        console.log(res);
        console.log(res.status);
        if (res.status === 201) {
          this.setState({ redirectTOhome: true })
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

    if (this.state.redirectTOhome) {
      return <Redirect to="/" />
    }
    if (this.state.isError) {
      alert('user alrady exist, please login');
      return <Redirect to="/login/" />
    }

    return (
      <div className="registerComponent">

        <form className="form-horizontal" method="post" action="#">

          <input type="text" name="name" id="name" placeholder="Enter your Name"
            onChange={event => this.setState({ name: event.target.value })} required /> <br /><br />

          <input type="email" name="email" id="email" placeholder="Enter your Email"
            onChange={event => this.setState({ email: event.target.value })} required /><br /><br />

          <input type="text" name="city" id="city" placeholder="Enter your City"
            onChange={event => this.setState({ email: event.target.value })} required /><br /><br />

          <input type="text" name="state" id="state" placeholder="Enter your State"
            onChange={event => this.setState({ email: event.target.value })} required /><br /><br />

          <div>
            <div id="list1" className="dropdown-check-list" tabIndex="100">
              <span className="anchor">Pick your interests :</span> <br /><br />

              <input type="checkbox" />Sports & Fitnes <br />
              <input type="checkbox" />Learning <br />
              <input type="checkbox" />Food & Drinks <br />
              <input type="checkbox" />Music <br />
              <input type="checkbox" />Film <br />
              <input type="checkbox" />Arts <br />
              <input type="checkbox" />Book <br />
              <input type="checkbox" />Dance <br />
              <input type="checkbox" />Dog Wallking <br />
              <input type="checkbox" />Maternity leave <br />
              <input type="checkbox" />Fashion & Shopping <br />
              <input type="checkbox" />Hobbies & Crafts <br /><br />

            </div>
          </div>

          <input type="password" name="password" id="password" placeholder="Enter your Password"
            onChange={event => this.setState({ password: event.target.value })} required /><br /><br />

          <input type="password" name="confirm" id="confirm" placeholder="Confirm your Password"
            onChange={event => this.setState({ confirmedPass: event.target.value })} required /><br /><br />

          {disabled ? <p style={{ color: 'red' }}>Passwords don't match</p> : null}
          <button type="button" onClick={this.register} disabled={disabled}>Register</button>

        </form>
      </div>
    );
  }
}