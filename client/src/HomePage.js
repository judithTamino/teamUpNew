import React, { Component } from 'react';
import { Redirect } from "react-router-dom";


export default class HomePage extends Component {
    state = {redirectToRegister:false}
    render() {
        if (this.state.redirectToRegister) {
            return <Redirect to = "/register"/>
        }
        return (
            <div>
                <div>
                    <h1>The real world is calling</h1>
                    <h5>Join a local group to meet people, try somthing new, or do more of what you love</h5>
                    <button onClick = {
                        () => {
                            this.setState ({redirectToRegister:true});
                        }
                    }>Join TeamUp</button>
                </div>

                <div>
                    <div>
                        <h5>Categories</h5>
                        <span>Browse groups by topics you're interested in </span>
                    </div>
                </div>
            </div>
        );
    }
}
