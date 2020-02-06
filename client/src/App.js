import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import HomePage from './HomePage.js';
import Register from './Register';
import LogIn from './LogIn';
import CreateGroup from './CreateGroup';
import UserHomePage from './UserHomePage';
import Logout from './Logout';
import EditGroup from './EditGroup';

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user:{},
    }
  }

  render() {
    return (
      <BrowserRouter>

        <div className="App">
          {!this.state.loggedIn ? <div className="upperMenu">
            <Link to='/' id="logoLink">TeamUp</Link>
            <Link to='/login' className="logLink">Log in</Link>
            <Link to='/register' id="registerLink">Register</Link>
          </div> : <div className="upperMenu">
            <Link to='/' id="logoLink">TeamUp</Link>
            <Link to = '/logout' className="logLink">Log out</Link>
            </div>}
          {/* <div className="upperMenu">
            <Link to='/' id="logoLink">TeamUp</Link>
            <Link to='/login' id="loginLink">Log in</Link>
            <Link to='/register' id="registerLink">Register</Link>
          </div> */}
        </div>

        <Switch>
          <Route exact path='/' render={props => (
            <HomePage />
          )} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={LogIn} />

          <Route exact path='/userHomePage' component={UserHomePage}/>
          <Route exact path='/logout' component={Logout} />

          <Route exact path='/createGroup' component={CreateGroup} />
          <Route exact path='/editGroup' component={EditGroup}/>
        </Switch>

      </BrowserRouter>
    );
  }
}



export default App;
