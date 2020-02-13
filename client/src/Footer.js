import React, { Component } from "react";
import { Redirect } from "react-router-dom";


export default class Footer extends Component {
    state = { redirectToGroups: false }

    render() {
        if (this.state.redirectToGroups) {
            return <Redirect to='/createGroup' />
        }

        return (
            <div>
                <span></span>
                <div>
                    <h3 onClick={() => {
                        this.setState({ redirectToGroups: true })
                    }}>Start a new group</h3>
                    <p>© 2020 Teamup is a wholly owned subsidiary of EJ Companies Inc.</p>
                </div>
            </div>
        )
    }


}