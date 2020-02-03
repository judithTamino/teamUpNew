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
<<<<<<< HEAD
import Logout from './Logout'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  isLoggedIn = () => {
    this.setState({ loggedIn: false });
    axios.post('/users/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.setState({ loggedIn: true });
          localStorage.setItem('user', this.state.email);
        } else {
          this.setState({ loggedIn: false });
          console.log(`error code : ${res.status}`);

        }

      })
      .catch(err => {
        this.setState({ isError: true })
        console.log(err);
      })
=======
import EditGroup from './EditGroup';


class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user:{},
      managerGroupsArr:[],
    }
>>>>>>> 03052024e87966dcb57aff6aecb97b9262f83dab
  }
  id = '';

<<<<<<< HEAD
=======
  getId = (id) => {
    this.id = id;
  }
>>>>>>> 03052024e87966dcb57aff6aecb97b9262f83dab

  temp = '';

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

<<<<<<< HEAD
          <Route exact path='/userHomePage' render={
            () => <UserHomePage getUser={this.state.user} />
          } />
          <Route exact path='/logout' component={Logout} />


          <Route exact path='/createGroup' component={CreateGroup} />
=======
          <Route exact path ='/userHomePage' render = {
            () => <UserHomePage getUser = {this.state.user}/>
          }/>

          <Route exact path = '/createGroup' component = {CreateGroup}/>
          <Route exact path = '/editGroup' component = {EditGroup}/>
>>>>>>> 03052024e87966dcb57aff6aecb97b9262f83dab
        </Switch>

      </BrowserRouter>
    );
  }

<<<<<<< HEAD
  componentDidMount() {
    axios.get('/users/userHomePage')
      .then(res => {

        let myUser = res.data.filter(user1 => user1.email === localStorage.user)
        this.setState({ user: myUser[0] })
      })
      .catch(err => { console.log(`error code : ${err}`); });
  }
=======
  componentDidMount () {
    axios.get ('/users/userHomePage')
    .then (res => {
      let myUser = res.data.filter (user1 => user1.email === localStorage.user)
      this.setState ({user:myUser[0]})  
    })
    .catch (err => {console.log (`error code : ${err}`);});

  } 
>>>>>>> 03052024e87966dcb57aff6aecb97b9262f83dab
}



export default App;
