import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import HomePage from './HomePage.js';
import Register from './Register';
import LogIn from './LogIn';
import CreateGroup from './CreateGroup';
import UserHomePage from './UserHomePage';
<<<<<<< HEAD
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
=======
import Logout from './Logout'



class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { loggedIn: false };
  // }

  // isLoggedIn = () => {
  //   this.setState({ loggedIn: false });
  //   axios.post('/users/login', {
  //     email: this.state.email,
  //     password: this.state.password
  //   })
  //     .then(res => {
  //       // console.log(res);
  //       if (res.status === 200) {
  //         this.setState({ loggedIn: true });
  //         localStorage.setItem('user', this.state.email);
  //       } else {
  //         this.setState({ loggedIn: false });
  //         console.log(`error code : ${res.status}`);

  //       }

  //     })
  //     .catch(err => {
  //       this.setState({ isError: true })
  //       console.log(err);
  //     })
  // }
  id = '';


  temp = '';
>>>>>>> 76f65922c6aeae135048835a0bfb749bf6e9228b

  render() {
    return (
      <BrowserRouter>

        <div className="App">
          {/* {!this.state.loggedIn ? <div className="upperMenu">
            <Link to='/' id="logoLink">TeamUp</Link>
            <Link to='/login' className="logLink">Log in</Link>
            <Link to='/register' id="registerLink">Register</Link>
          </div> : <div className="upperMenu">
            <Link to='/' id="logoLink">TeamUp</Link>
            <Link to = '/logout' className="logLink">Log out</Link>
            </div>} */}
          <div className="upperMenu">
            <Link to='/' id="logoLink">TeamUp</Link>
            <Link to='/login' className="logLink">Log in</Link>
            <Link to='/register' id="registerLink">Register</Link>
          </div>
        </div>

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={LogIn} />

<<<<<<< HEAD
          <Route exact path='/userHomePage' component={UserHomePage}/>
=======
          <Route exact path='/userHomePage' render={
            () => <UserHomePage getUser={this.state.user} />
          } />
>>>>>>> 76f65922c6aeae135048835a0bfb749bf6e9228b
          <Route exact path='/logout' component={Logout} />

          <Route exact path='/createGroup' component={CreateGroup} />
<<<<<<< HEAD
          <Route exact path='/editGroup' component={EditGroup}/>
=======
>>>>>>> 76f65922c6aeae135048835a0bfb749bf6e9228b
        </Switch>

      </BrowserRouter>
    );
  }
<<<<<<< HEAD
=======

  componentDidMount() {
    axios.get('/users/userHomePage')
      .then(res => {

        let myUser = res.data.filter(user1 => user1.email === localStorage.user)
        this.setState({ user: myUser[0] })
      })
      .catch(err => { console.log(`error code : ${err}`); });
  }
>>>>>>> 76f65922c6aeae135048835a0bfb749bf6e9228b
}



export default App;
