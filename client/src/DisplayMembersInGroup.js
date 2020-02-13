import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export default class DisplayMembersInGroup extends Component {
    state = {
      arrUser:[],
      membersInGroup:this.props.location.state.membersInGroup,
      redirectToGroupInfo:false,
      redirectToDisplayGroupByCategory:false,
    }
    groupMember = [];

    getUser = (email) => {
        axios
          .get(`/users/userHomePage/${email}`)
          .then(res => {
            if (res.status === 200) {
              this.groupMember.push (res.data);
              this.setState ({arrUser:this.groupMember});
            } else {
              console.log(res);
            }
          })
          .catch(err => {
            console.log(err);
          });
    }

  render() {
    if (this.state.redirectToGroupInfo) {
      return <Redirect to = {{
        pathname:'/groupInfo',
        state:{id:localStorage.groupId}
      }}/>
    }

    if (this.state.redirectToDisplayGroupByCategory) {
      return <Redirect to = {{
        pathname:'/displayGroupsByCategory',
        state: {id:localStorage.categoryId}
      }}/>
    }
    return (
        <div>
          <button onClick = {() => {
            this.setState ({redirectToGroupInfo:true})
          }}>Group Info</button> 
          <button onClick = {() => {
            this.setState ({redirectToDisplayGroupByCategory:true})
          }}>Groups</button> 
          {this.groupMember.map ((member, i) => {
            return (
              <div key = {i}>
                <h6>{member[0].name}</h6>
                <div>
                  <span> Joind {moment(member[0].joiningDate).format('MMMM, Do YYYY')}</span>
                </div>
                <div>
                  <span>{member[0].city}</span>, 
                   <span>{member[0].state}</span>
                </div>
              </div>
            )
          })}
        </div>
    );
  }

  componentDidMount () {
    for (let i=0; i<this.state.membersInGroup.length; i++) {
      const member = this.state.membersInGroup[i].members;
      this.getUser (member);
    }
  }
}
