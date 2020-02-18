import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { MdInfo, MdLockOpen, MdLockOutline } from "react-icons/md";
import axios from "axios";
import "./style/displayGroupsByCategory.css";

export default class DisplayGroupsByCategory extends Component {
  state = {
    categoryId: this.props.location.state.id,
    category: [],
    groups: [],
    redirectToGroupInfo: false
  };

  getSelectCategory = () => {
    axios
      .get(`/categories/findCategoryById/${this.props.location.state.id}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ category: res.data });
        } else {
          throw res.status;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  getGroupByCategory = () => {
    axios
      .get(`/groups/getGroupByCategory/${this.props.location.state.id}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ groups: res.data });
        } else {
          throw res.status;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.redirectToGroupInfo) {
      return (
        <Redirect
          to={{
            pathname: "/groupInfo",
            state: { id: localStorage.groupId }
          }}
        />
      );
    }
    return (
      <div className="diplayGroupsByCategoty">
        <div className="GroupInfo">
          <h1 className="GroupInfo-MainTitle">
            Explore {this.state.category.name}
          </h1>
          <p className="GroupInfo-Description">
            Find out what's happening in {this.state.category.name} groups
            around the world
            <span className="Description-And">&</span>
            <span className="Description-Part2">
              start meeting up with the ones near you.
            </span>
          </p>
        </div>

        <div className="GroupsDisplay">
          {this.state.groups.map((group, i) => {
            return (
              <div key={i} className="GroupsDisplay-DisplayGroup">
                <h5 className="GroupName">{group.groupName}</h5>
                <h6 className="GroupMembers">{group.members.length} members</h6>
                <div>
                  <div
                    onClick={() => {
                      localStorage.setItem("groupId", group._id);
                      this.setState({ redirectToGroupInfo: true });
                    }}
                  >
                    <span className="Info">
                      <MdInfo className="IconInfo" /> Info
                    </span>
                  </div>
                  <div>
                    <span className="Status">
                      {group.groupStatus === "open" ? (
                        <MdLockOpen className="IconStatus" />
                      ) : (
                        <MdLockOutline className="IconStatus" />
                      )}
                      {group.groupStatus}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getSelectCategory();
    this.getGroupByCategory();
  }
}
