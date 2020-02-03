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
import EditGroup from './EditGroup';


class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user:{},
      managerGroupsArr:[],
    }
  }
  id = '';

  getId = (id) => {
    this.id = id;
  }


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
          <Route exact path='/' render = {props =>(
            <HomePage {...props} loggedInStatus = {this.state.loggedInStatus}/>
          )} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={LogIn} />

          <Route exact path ='/userHomePage' render = {
            () => <UserHomePage getUser = {this.state.user}/>
          }/>

          <Route exact path = '/createGroup' component = {CreateGroup}/>
          <Route exact path = '/editGroup' component = {EditGroup}/>
        </Switch>

      </BrowserRouter>
    );
  }

  componentDidMount () {
    axios.get ('/users/userHomePage')
    .then (res => {
      let myUser = res.data.filter (user1 => user1.email === localStorage.user)
      this.setState ({user:myUser[0]})  
    })
    .catch (err => {console.log (`error code : ${err}`);});

  } 
}

export default App;
