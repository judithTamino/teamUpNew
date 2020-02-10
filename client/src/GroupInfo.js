import React, { Component } from 'react';
import axios from "axios";
import {MdPlace, MdWatchLater, MdPeople, MdLockOpen, MdLockOutline} from 'react-icons/md';
import moment from "moment";
import "./style/groupInfo.css";

export default class GroupInfo extends Component {
    state = {
        group:[],
        membersInGroup:[],
    }
    getGroupById = () => {
        axios.get(`/groups/findGroupById/${this.props.location.state.id}`)
        .then(res => {
            if (res.status === 200) {
                this.setState({group:res.data});
            } else {
                throw res.status;
            }
        })
        .catch(err => {
            console.log (err);
        })
    }

    getMembersInGroup = () => {
        axios.get(`/groups/findMembersInGroup/${this.props.location.state.id}`)
        .then(res => {
            if (res.status === 200) {
                this.setState ({membersInGroup:res.data});
            } else {
                throw res.status;
            }
        }) 
        .catch(err => {console.log(err)});
    }

    joinGroup = () => {
        let tempMembersInGroup = [...this.state.membersInGroup];
        tempMembersInGroup.push (localStorage.user);
        this.setState ({membersInGroup:tempMembersInGroup});
    }

    updateGroupsMembers = () => {
        
    }

  render() {
      let disabled = false;
      if (this.state.group.groupStatus !== 'open') {
        disabled = true;
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
                        <MdPlace/>
                        <span>{this.state.group.city}</span>
                    </div>
                    <div>
                        <MdWatchLater/>
                        <span>{moment(this.state.group.date).format('MMMM Do YYYY')}</span>
                        <br/>
                        <span>{this.state.group.startTime}</span> to <span>{this.state.group.endTime}</span>
                    </div>
                    <div>
                        <MdPeople/>
                        <span>{this.state.membersInGroup.length} members</span>
                    </div>
                    <div>
                        {this.state.group.groupStatus === 'open' ? <MdLockOpen/> : <MdLockOutline/> }
                        <span>{this.state.group.groupStatus}</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-8">
                    <h5>Details</h5>
                    <p>{this.state.group.description}</p>
                </div>
                <div className="col-4">
                    <button disabled = {disabled}>Join Group</button>
                </div>
            </div>
        </div>
    );
  }

  componentDidMount () {
    this.getGroupById();
    this.getMembersInGroup();
  }
}
