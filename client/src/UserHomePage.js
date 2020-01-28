import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


export default class UserHomePage extends Component {
    user = localStorage.getItem ('user');
    state = {flag : false};

    redirectToCreateGroup = () => {
        this.setState ({flag: true});
    }


    
    render() {
        if (this.state.flag) {
            return <Redirect to = '/createGroup'/>
        }
        return (
            <div>
                UserHomePage
                <p> user: {this.user}</p>
                <button onClick = { this.redirectToCreateGroup }>Start a new group</button>
                {this.props.findUser(this.user)}
                {/* {this.props.user} */}
            </div>
        );
  }
}
