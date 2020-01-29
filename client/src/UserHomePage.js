import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


export default class UserHomePage extends Component {

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
                <h3>{this.props.getUser.name}</h3>
                <div>
                    Location:
                    <p>{this.props.getUser.city}</p>
                </div>

                <div>
                    TeamUp member since:
                    <p>{this.props.getUser.joiningDate}</p>
                </div>

                <div>
                    Intrests:
                    <p>{this.props.getUser.interests}</p>
                </div>
                <button onClick = { this.redirectToCreateGroup }>Start a new group</button>
            </div>
        );
  }


}
