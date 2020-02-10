import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import "./App.css";
// import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

// import HomePage from './HomePage.js';
// import Register from './Register';
// import LogIn from './LogIn';
// import CreateGroup from './CreateGroup';
// import UserHomePage from './UserHomePage';
// import Logout from './Logout';
// import EditGroup from './EditGroup';
// import DisplayGroupsByCategory from './DisplayGroupsByCategory';
import Navbar from "./Navbar";
import { BrowserRouter} from "react-router-dom";

// import Logout from './Logout';

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
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar/>
        </div>
      </BrowserRouter>
      // // <BrowserRouter>

      // //   <div className="App">
      //     {/* {!this.state.loggedIn ? <div className="upperMenu">
      //       <Link to='/' id="logoLink">TeamUp</Link>
      //       <Link to='/login' className="logLink">Log in</Link>
      //       <Link to='/register' id="registerLink">Register</Link>
      //     </div> : <div className="upperMenu">
      //       <Link to='/' id="logoLink">TeamUp</Link>
      //       <Link to = '/logout' className="logLink">Log out</Link>
      //       </div>} */}
      //     {/* <div className="upperMenu">
      //       <Link to='/' id="logoLink">TeamUp</Link>
      //       <Link to='/login' className="logLink">Log in</Link>
      //       <Link to='/register' id="registerLink">Register</Link>
      //     </div>
      //   </div>

      //   <Switch>
      //     <Route exact path='/' component={HomePage} />
      //     <Route exact path='/register' component={Register} />
      //     <Route exact path='/login' component={LogIn} />

      //     <Route exact path='/userHomePage' component={UserHomePage}/>
      //     <Route exact path='/logout' component={Logout} />

      //     <Route exact path='/createGroup' component={CreateGroup} />
      //     <Route exact path='/editGroup' component={EditGroup}/>
      //     <Route exact path='/displayGroupsByCategory' component={DisplayGroupsByCategory}/>
      //   </Switch>

      // </BrowserRouter> */}
    );
  }
}
export default App;
