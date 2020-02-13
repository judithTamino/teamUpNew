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
    isInTheGroup: false
  };
  isGroupClose = false;

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

  };

  joinGroup = () => {
    axios
      .patch(`/groups/updateGroupsMembers/${this.props.location.state.id}`, {
        members: localStorage.user
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({ isJoinGroup: true });
          setTimeout(() => {
            this.setState({ isJoinGroup: false });
          }, 5000);
        } else {
          throw res.status;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let disabled = false;
    if (
      this.state.group.groupStatus !== "open" ||
      !("user" in localStorage) ||
      this.isInTheGroup === true
    ) {
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
        <div className="row">
          <div className="col-8">
            <h1>{this.state.group.groupName}</h1>
            <span>
              Created by
              <h6>{this.state.group.groupManager}</h6>
            </span>
          </div>
          <div className="col-4">
            <div>
              <MdPlace />
              <span>{this.state.group.city}</span>
            </div>
            <div>
              <MdWatchLater />
              <span>
                {moment(this.state.group.date).format("MMMM Do YYYY")}
              </span>
              <br />
              <span>{this.state.group.startTime}</span> to{" "}
              <span>{this.state.group.endTime}</span>
            </div>
            <div>
              <MdPeople />
              <span>{this.state.membersInGroup.length} members</span>
              <span
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
                <MdLockOpen />
              ) : (
                <MdLockOutline />
              )}
              <span>{this.state.group.groupStatus}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <h5>Details</h5>
            <p>{this.state.group.description}</p>
            <p>* only registered members can join group</p>
          </div>
          <div className="col-4">
            <button
              disabled={disabled}
              onClick={() => {
                this.isMemberInGroup();
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
            {this.state.isInTheGroup ? <p>Already a member</p> : null}
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
