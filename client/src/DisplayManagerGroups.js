import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { FaRegTrashAlt, FaRegEdit, FaLock, FaUnlock } from "react-icons/fa";
import "./style/displayManagerGroups.css";

export default class DisplayManagerGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGroupDeleted: false,
      redirectToEditGroup: false,
      managerGroupsArr: [],
      groupForEdit: [],
      id: ""
    };
  }

  updateStatus = (id, status) => {
    axios
      .get(`/groups/updateStatus/${id}/${status}`)
      .then(res => {
        if (res.status === 200) {
          console.log(res);
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  getManagerGroups = () => {
    axios
      .get(`/groups/${localStorage.user}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ managerGroupsArr: res.data });
        } else {
          console.log(`error statuse code : ${res.status}`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteGroup = (id, index) => {
    axios
      .delete(`/groups/${id}`)
      .then(res => {
        if (res.status === 200) {
          let tempGroups = [...this.state.managerGroupsArr];
          tempGroups.splice(index, 1);
          this.setState({ managerGroupsArr: tempGroups });

          this.setState({ isGroupDeleted: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  getGroupForEdit = id => {
    let tempGroups = [...this.state.managerGroupsArr];
    for (let i = 0; i < tempGroups.length; i++) {
      const element = tempGroups[i];
      if (element._id === id) {
        this.setState({ groupForEdit: element });
        this.setState({ id: id });
      }
    }
  };

  render() {
    if (this.state.redirectToEditGroup) {
      return (
        <Redirect
          to={{
            pathname: "/editGroup",
            state: { id: this.state.id, editGroup: this.state.groupForEdit }
          }}
        />
      );
    }

    return (
      <div className="displayManagerGroup">
        <h3 className="DisplayManagerGroups-MainTitle">Groups you manage</h3>
        {this.state.managerGroupsArr.map((group, i) => {
          return (
            <div className="ManagerGroups" key={i}>
              <div className="ManagerGroups-GroupInfo">
                <span className="ManagerGroups-GroupName">{group.groupName}</span>
                <span className="ManagerGroups-NumMembers">
                  {group.members.length} members
                </span>
                <span className="ManagerGroups-GroupStatus">{group.groupStatus}</span>
              </div>
              <div className="ManagerGroups-GroupsEdit">
                <div className="ManagerGroups-Icons"
                  onClick={() => {
                    this.deleteGroup(group._id, i);
                  }}
                >
                  <FaRegTrashAlt />
                  <span>Delete Group</span>
                </div>

                <div className="ManagerGroups-Icons"
                  onClick={() => {
                    this.setState({ redirectToEditGroup: true });
                    this.getGroupForEdit(group._id);
                  }}
                >
                  <FaRegEdit />
                  <span>Edit Group</span>
                </div>
                {moment(new Date()).format("MMM Do YY") >=
                moment(group.date).format("MMM Do YY") ? (
                  <div >
                    {this.updateStatus(group._id, "close")}
                    <FaLock />
                    <span>Group Closed</span>
                  </div>
                ) : (
                  <div>
                    <div className="ManagerGroups-Icons"
                      onClick={() => {
                        this.updateStatus(group._id, "close");
                        window.location.reload(false);
                      }}
                    >
                      <FaLock />
                      <span>Close Group</span>
                    </div>
                    <div className="ManagerGroups-Icons"
                      onClick={() => {
                        this.updateStatus(group._id, "open");
                        window.location.reload(false);
                      }}
                    >
                      <FaUnlock />
                      <span>Open Group</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    this.getManagerGroups();
  }
}
