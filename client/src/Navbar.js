import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Link, Switch, Route, withRouter } from 'react-router-dom';

import HomePage from './HomePage.js';
import Register from './Register';
import LogIn from './LogIn';
import CreateGroup from './CreateGroup';
import UserHomePage from './UserHomePage';
import EditProfile from './EditProfile';

import EditGroup from './EditGroup';
import DisplayGroupsByCategory from './DisplayGroupsByCategory';
import GroupInfo from './GroupInfo';

class Navbar extends Component {

    logOut(){
        localStorage.clear();
        this.props.history.push('/');
    }

    generalPage = (
        <div className="App">
            <div className="upperMenu">
                <Link to='/' id="logoLink">TeamUp</Link>
                <Link to='/login' className="logLink">Log in</Link>
                <Link to='/register' id="registerLink">Register</Link>
            </div>
        </div>
    )

    loggedIn = (
        <div className="App">
            <div className="upperMenu">
                <Link to='/' id="logoLink">TeamUp</Link>
                <Link to='' onClick = {this.logOut.bind(this)} className="logLink">Log out</Link>
                <Link to='/createGroup' id="registerLink">Create Group</Link>
                <Link to = '/userHomePage' id="profileLink">Profile</Link>
            </div>
        </div>
    )

    render() {
        return (
            <BrowserRouter>
                {this.navController()}
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/register' render={
                        () => <Register setToken={this.props.setToken} />
                    } />
                    <Route exact path='/login' render={
                        () => <LogIn setToken={this.props.setToken} />
                    } />

                    <Route exact path='/userHomePage' component={UserHomePage} />
                    <Route exact path = '/editprofile' component = {EditProfile}/>

                    <Route exact path='/createGroup' component={CreateGroup} />
                    <Route exact path='/editGroup' component={EditGroup} />
                    <Route exact path='/displayGroupsByCategory' component={DisplayGroupsByCategory} />
                    <Route exact path='/groupInfo' component={GroupInfo}/>
                </Switch>
            </BrowserRouter>
        )
    }

    navController = () => {
        if (localStorage.user) {
            return this.loggedIn;
        }
        else {
            return this.generalPage;
        }
    }
}

export default withRouter (Navbar);