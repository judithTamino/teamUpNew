import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import DisplayManagerGroups from "./DisplayManagerGroups";

import axios from "axios";
import moment from "moment";

import "./style/UserHomePage.css";
// import "./style/displayMembersInGroup.css";

import DisplayGroupsUserIsMemberIn from "./DisplayGroupsUserIsMemberIn";
import { MdAccountBox } from "react-icons/md";

export default class UserHomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: false,
      user: [],
      interests: [],
      redirectToEditProfile: false
    };
  }

  loadProfileImage = () => {
    let fromData = new FormData();
    fromData.append("imgFile", this.state.file);
    fromData.append("email", localStorage.user);

    const config = { headers: { "content-type": "multipart/from-data" } };
    axios
      .post("/users/userHomePage", fromData, config)
      .then(res => {
        if (res.status === 201) {
          this.setState({ newFilename: res.data.file.filename });
          this.getProfileImage();
        } else {
          console.log(res.status);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  getUser = () => {
    axios
      .get(`/users/userHomePage/${localStorage.user}`)
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

  getIntrests = () => {
    axios
      .get(`/users/findUserInterst/${localStorage.user}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ interests: res.data });
        } else {
          throw res.status;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.redirectToEditProfile) {
      return (
        <Redirect
          to={{
            pathname: "/editprofile",
            state: { userArr: this.state.user }
          }}
        />
      );
    }

    return (
      <div className="userHomepage">
        {this.state.user.map((user1, i) => {
          return (
            <div key={i} className="ProfileInfo">
              <div className="row">
                <div className="PersonalInfo col-5">
                  <div>
                    <h2 className="ProfileInfo-UserName">{user1.name}</h2>
                  </div>

                  <div className="ProfileInfo-Location">
                    <h6 className="ProfileInfo-Location-MainTitle">
                      Location:
                    </h6>
                    <span className="ProfileInfo-Location-Details">
                      {user1.city}
                    </span>
                  </div>

                  <div className="ProfileInfo-MemberSince">
                    <h6 className="ProfileInfo-MemberSince-MainTitle">
                      TeamUp member since:
                    </h6>
                    <span className="ProfileInfo-MemberSince-Details">
                      {moment(user1.joiningDate).format("MMMM Do YYYY")}
                    </span>
                  </div>
                </div>

                <div className="ProfileImgAndIntrests col-5">
                  <div>
                    <MdAccountBox className="userProfileIcon" />
                  </div>
                  <div className="ProfileImgAndIntrests-Intrests">
                    <h6 className="ProfileImgAndIntrests-Intrests-MainTitle">
                      Intrests:
                    </h6>
                    <span className="ProfileImgAndIntrests-Intrests-Details">
                      {this.state.interests.map((interest, i) => {
                        return (
                          <span key={i}>
                            {interest} <span>,</span>
                          </span>
                        );
                      })}
                    </span>
                  </div>
                  <span
                    className="EditProfile"
                    onClick={() => {
                      this.setState({ redirectToEditProfile: true });
                    }}
                  >
                    Edit profile
                  </span>
                </div>
              </div>

                <h2 className="NumberOfGroupsUserJoin">Member of {user1.groups.length} group(s)</h2>

              <DisplayGroupsUserIsMemberIn groupsArr={user1.groups}/>
              <DisplayManagerGroups/>
            </div>
          );
        })}
      </div>
    );
  }
  componentDidMount() {
    this.getUser();
    this.getIntrests();
  }
}
