import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { FaUserMinus } from "react-icons/fa";
import './style/displayGroupsUserIsMemberIn.css';

export default class DisplayGroupsUserIsMemberIn extends Component {
  state = {
    userGroups: []
  };
  temUserGroups = [];
  getGroups = groupId => {
    axios
      .get(`groups/findGroupById/${groupId}`)
      .then(res => {
        if (res.status === 200) {
          this.temUserGroups.push(res.data);
          this.setState({ userGroups: this.temUserGroups });
        } else {
          console.log(res.status);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  removeUserFromGroup = () => {
    axios.patch(`/groups/exitGroup/${localStorage.groupId}`, {
      members: localStorage.user
    })
    .then(res => {
      if(res.status === 200){
        
        console.log('good');
      }else{
        console.log('bad');
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }

  removeGroupFromUserGroups = () =>{
    axios.get(`/users/exitGroupUserSide/${localStorage.user}/${localStorage.groupId}`)
    .then(res => {
      if(res.status === 200){
        console.log('good');
        this.removeUserFromGroup();
      }else{
        console.log('bad');
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }
  
  render() {
    return (
      <div className="displayGroupsUserIsMemberIn">
        {this.state.userGroups.map((group, i) => {
          return (
            <div key={i} className="GroupsUserIsMemberInDisplay">
              <div className="GroupsUserIsMemberInDisplay-ColorBlock"></div>
              <h6 className="GroupsUserIsMemberInDisplay-GroupName">{group.groupName}</h6>
              <div className="GroupsUserIsMemberInDisplay-GroupDate">{moment(group.date).format("MMMM, Do YYYY")}</div>
              <p onClick = {() => {
                localStorage.setItem('groupId', group._id);
                this.removeGroupFromUserGroups();
                window.location.reload(false);
              }} className="GroupsUserIsMemberInDisplay-ExitGroupBtn">
                <FaUserMinus className="GroupsUserIsMemberInDisplay-ExitGroupIcon"/>
                <span className="GroupsUserIsMemberInDisplay-ExitGroupText">Exit Group</span>
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    for (let i = 0; i < this.props.groupsArr.length; i++) {
      const element = this.props.groupsArr[i];
      this.getGroups(element);
    }
  }
}
