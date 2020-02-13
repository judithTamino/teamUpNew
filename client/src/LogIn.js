import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirectTOhome: false,
      isError: false
    };
  }

  login = () => {
    this.setState({ isError: false });
    axios.post('/users/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('user', this.state.email);
          this.setState({ redirectTOhome: true });
          window.location.reload(false);
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
    const disabled = !this.state.email || !this.state.password

    if (this.state.redirectTOhome) {
      return <Redirect to={{
        pathname: '/userHomePage',
        state: { email: this.state.email }
      }} />
    }
    return (
      <div className="login">

        <h1> Login</h1>

        <div className ='loginInputs'>
          
          <input
            placeholder="Email"
            type="email"
            onChange={event => this.setState({ email: event.target.value })}
            className="emailInput"
          ></input>

          <input
            placeholder="Password"
            type="password"
            onChange={event => this.setState({ password: event.target.value })}
            className="passwordInput"
          ></input>

          {this.state.isError ? <p style={{ color: 'red' }}>Login error</p> : null}
          <button
            disabled={disabled}
            onClick={this.login}
            className="btn btn-outline-danger"
            id="loginButton"
          >Login</button>

        </div>

      </div>
    );
  }
}
