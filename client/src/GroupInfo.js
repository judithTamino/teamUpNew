import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  MdPlace,
  MdWatchLater,
  MdPeople,
  MdLockOpen,
  MdLockOutline,
  MdDone
} from "react-icons/md";
import moment from "moment";
import "./style/groupInfo.css";

export default class GroupInfo extends Component {
  state = {
    group: [],
    membersInGroup: [],
    isJoinGroup: false,
    redirectToDisplayMembersInGroup: false,
    joinGroup: false,
    arrUser: []
  };
  isGroupClose = false;
  isInTheGroup = false;

  getGroupById = () => {
    axios
      .get(`/groups/findGroupById/${this.props.location.state.id}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ group: res.data });
        } else {
          throw res.status;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  getMembersInGroup = () => {
    axios
      .get(`/groups/findMembersInGroup/${this.props.location.state.id}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ membersInGroup: res.data });
        } else {
          throw res.status;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  isMemberInGroup = () => {
    if (this.state.membersInGroup.length === 0) {
      this.joinGroup();
    } else {
      for (let i = 0; i < this.state.membersInGroup.length; i++) {
        const element = this.state.membersInGroup[i].members;
        if (element === localStorage.user) {
          this.isInTheGroup = true;
        }
      }
      if (!this.isInTheGroup) {
        this.joinGroup();
      }
    }
  };

  joinGroup = () => {
    axios
      .patch(`/groups/updateGroupsMembers/${this.props.location.state.id}`, {
        members: localStorage.user
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ isJoinGroup: true });
          this.userGroups();
          setTimeout(() => {
            this.setState({ isJoinGroup: false });
          }, 3000);
        } else {
          throw res.status;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  userGroups = () => {
    axios
      .get(`/users/findUserGroups/${localStorage.user}/${localStorage.groupId}`)
      .then(res => {
        if (res.status === 200) {
          console.log(res.status);
        } else {
          throw res;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let disabled = false;
    if (this.state.group.groupStatus !== "open" || !("user" in localStorage)) {
      disabled = true;
    }

    if (this.state.group.groupStatus !== "open") {
      this.isGroupClose = true;
    }

    if (this.state.redirectToDisplayMembersInGroup) {
      return (
        <Redirect
          to={{
            pathname: "/displayMembersInGroup",
            state: { membersInGroup: this.state.membersInGroup }
          }}
        />
      );
    }

    return (
      <div className="groupInfo">
        <div className="row GroupInfo-Row">
          <div className="col-6">
            <h1 className="GroupName">{this.state.group.groupName}</h1>
            <span>
              Created by
              <h6>{this.state.group.groupManager}</h6>
            </span>
          </div>
          <div className="col-4 Details">
            <div>
              <MdPlace className="LocationIcon" />
              <span className="Street">{this.state.group.street}</span>{" "}
              <span className="StreetNumber">
                {this.state.group.streetNumber}
              </span>{" "}
              * <span className="City">{this.state.group.city}</span>
            </div>
            <div >
              <MdWatchLater className="TimeIcon" />
              <span className="Date">
                {moment(this.state.group.date).format("MMMM Do YYYY")}
              </span>
              <div className="Time">
                <span className="From">{this.state.group.startTime}</span> to{" "}
                <span className="To">{this.state.group.endTime}</span>
              </div>
            </div>
            <div>
              <MdPeople className="GroupIcon" />
              <span className="Members">
                {this.state.membersInGroup.length} members
              </span>
              <span
                className="SeeAll"
                onClick={() => {
                  this.setState({ redirectToDisplayMembersInGroup: true });
                }}
              >
                {" "}
                See all members{" "}
              </span>
            </div>
            <div>
              {this.state.group.groupStatus === "open" ? (
                <MdLockOpen className="StatusIcon" />
              ) : (
                <MdLockOutline className="StatusIcon" />
              )}
              <span className="Status">{this.state.group.groupStatus}</span>
            </div>
          </div>
        </div>

        <div className="row GroupInfo-Row">
          <div className="col-6 Info-GroupDescription">
            <h5 className="Info-GroupTitle">Details</h5>
            <p>{this.state.group.description}</p>
            <p>* only registered members can join group</p>
          </div>
          <div className="col-4">
            <button className="Info-JoinGroupBtn"
              disabled={disabled}
              onClick={() => {
                this.isMemberInGroup();
                this.setState({ joinGroup: true });
                setTimeout(() => {
                  window.location.reload(false);
                }, 5000);
              }}
            >
              Join Group
            </button>
            {this.state.isJoinGroup ? (
              <div>
                <MdDone />
                <span>You are now member in {this.state.group.groupName}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getGroupById();
    this.getMembersInGroup();
  }
}
