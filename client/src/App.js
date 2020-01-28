import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import HomePage from './HomePage.js';
import Register from './Register';
import LogIn from './LogIn';
import CreateGroup from './CreateGroup';
import UserHomePage from './UserHomePage';


class App extends Component {
  state = {userEmail:''}
  temp = '';

  findUser = email => {
    axios.get ('/users/userHomePage').then (res => {
      for (let i=0; i<res.data.length; i++) {
        if (res.data[i].email === email) {
          this.temp  = res.data[i];
          return;
        }
      }
      this.setState({userEmail:this.temp});
      console.log (this.state.userEmail);
    }).catch (err => {
      console.log (`error code : ${err}`); 
    }); 
  }

  // findUser = email => {
  //   let tempUser = [...this.state.userEmail];
   
  //   axios.get (`/users/userHomePage`).then (res => {
  //     // const arrUsers = res.data;
      
  //     for (let i = 0; i < res.data.length; i++) {
  //       if (res.data[i].email === email) {
  //         tempUser = res.data[i]
  //       }
  //     }
  //     this.setState ({userEmail:tempUser});
  //   }).catch (err => {
  //     console.log (`error code : ${err}`);
  //   });  
  // }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="upperMenu">
            <Link to='/' id="logoLink">TeamUp</Link>
            <Link to='/login' id="loginLink">Log in</Link>
            <Link to='/register' id="registerLink">Register</Link>
          </div>
        </div>

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={LogIn} />
          <Route exact path='/userHomePage' render = {
            () => <UserHomePage findUser = {this.findUser}/>
          }/>
          <Route exact path = '/createGroup' component = {CreateGroup}/>
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
