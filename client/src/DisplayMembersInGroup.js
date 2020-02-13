import React, { Component } from 'react';
import axios from "axios";

export default class DisplayMembersInGroup extends Component {
    state = {
        user:[],
    }

    getUser = (email) => {
        axios
          .get(`/users/userHomePage/${email}`)
          .then(res => {
            if (res.status === 200) {
              this.setState({ user: res.data });
            } else {
              console.log(res);
            }
          })
          .catch(err => {
            console.log(err);
          });
    };

  render() {
    return (
        <div> 
            {this.props.membersInGroup.map((member, i) => {
                return (
                    <div key = {i}>
                        {this.getUser(member.members)}
                        {this.state.user.map ((user, i) => {
                            return (
                                <div key = {i}>
                                    <span>{user.name}</span>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
  }
  componentDidMount () {

  }
}
