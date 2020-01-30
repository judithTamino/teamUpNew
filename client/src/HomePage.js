import React, { Component } from 'react';
import Register from './Register'

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth(data) {
        // todo update parent component
        this.props.history.push('./HomePage');
        this.props.handLogin(data);
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <Register handleSuccessfulAuth = {this.handleSuccessfulAuth}/>
            </div>
        );
    }
}
