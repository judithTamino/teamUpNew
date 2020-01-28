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
    interests: '',
    groups: '',
    redirectTOhome: false, isError: false
  };


  register = () => {
    this.setState({ isError: false });
    axios.post('/users/register', {
      email: this.state.email,
      password: this.state.password,
      confirmedPass: this.state.confirmedPass
    })
      .then(res => {
        console.log(res);
        console.log (res.status);
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

  handleSubmit = () => {
    const { password, confirmedPass } = this.state;
    // perform all neccassary validations
    if (password !== confirmedPass) {
      alert("Passwords don't match");
      return false;
    } else {
      // make API call
      return true;
    }
  }

  render() {
    const disabled = this.state.password !== this.state.confirmedPass;

    if (this.state.redirectTOhome) {
      return <Redirect to="/" />
    }

    return (
      <div class="registerComponent">

        <form className="form-horizontal" method="post" action="#">

          <input type="text" name="name" id="name" placeholder="Enter your Name"
            onChange={event => this.setState({})} /> <br /><br />

          <input type="email" name="email" id="email" placeholder="Enter your Email"
            onChange={event => this.setState({ email: event.target.value })} /><br /><br />

          <input type="text" name="city" id="city" placeholder="Enter your City" /><br /><br />

          <input type="text" name="state" id="state" placeholder="Enter your State" /><br /><br />

          <div>
            <div id="list1" class="dropdown-check-list" tabindex="100">
              <span class="anchor">Pick your interests :</span>
              <ul class="items">
                <li><input type="checkbox" />Sports & Fitnes </li>
                <li><input type="checkbox" />Learning</li>
                <li><input type="checkbox" />Food & Drinks </li>
                <li><input type="checkbox" />Music </li>
                <li><input type="checkbox" />Film </li>
                <li><input type="checkbox" />Arts </li>
                <li><input type="checkbox" />Book</li>
                <li><input type="checkbox" />Dance</li>
                <li><input type="checkbox" />Dog Wallking</li>
                <li><input type="checkbox" />Maternity leave</li>
                <li><input type="checkbox" />Fashion & Shopping</li>
                <li><input type="checkbox" />Hobbies & Crafts</li>
              </ul>
            </div>
          </div>

          <input type="password" name="password" id="password" placeholder="Enter your Password"
            onChange={event => this.setState({ password: event.target.value })} /><br /><br />

          <input type="password" name="confirm" id="confirm" placeholder="Confirm your Password"
            onChange={event => this.setState({ confirmedPass: event.target.value })} /><br /><br />

          {disabled ? <p style={{ color: 'red' }}>Passwords don't match</p> : null}
          <button type="button" onClick={this.rergister} disabled={disabled}>Register</button>


        </form>
      </div>
    );
  }
}
