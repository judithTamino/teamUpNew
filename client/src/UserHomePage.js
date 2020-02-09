import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import DisplayManagerGroups from "./DisplayManagerGroups";
import axios from "axios";

import "./style/UserHomePage.css";
import { MdAccountBox } from "react-icons/md";
import { MdClose } from "react-icons/md";

export default class UserHomePage extends Component {
  state = {
    flag: false,
    showProfilePopUp: false,
    file: "",
    image: "",
    newFilename: "",
    showFile: false,
    user: [],
    interests: [],
  };

  loadProfileImage = () => {
    let fromData = new FormData();
    const config = { headers: { "content-type": "multipart/from-data" } };

    fromData.append("imgFile", this.state.file);
    fromData.append("email", localStorage.user);
    if (this.state.file !== "") {
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
    }
  };

  getProfileImage = () => {
    axios
      .get(`/users/userHomePage/${this.state.newFilename}`, {
        responseType: "blob"
      })
      .then(res => {
        if (res.status === 200) {
          const reader = new FileReader();
          reader.readAsDataURL(res.data);
          const _this = this;
          reader.onload = function() {
            const imageDataUrl = reader.result;
            _this.setState({ image: imageDataUrl });
          };
        } else {
          console.log(`error statuse code : ${res.status}`);
        }
      })
      .catch(err => console.log(err));
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
    axios.get (`/users/findUserInterst/${localStorage.user}`)
    .then(res => {
      if (res.status === 200) {
        this.setState ({interests:res.data});
      } else {
        throw res.status;
      }
    })
    .catch (err => {
      throw err;
    });
  };

  isThereProfileImage = (image) => {
    if (image !== '') {
       this.setState ({newFilename:image});
    }
  }

  redirectToCreateGroup = () => {
    this.setState({ flag: true });
  };

  showProfilePopUp = () => {
    this.setState({ showProfilePopUp: true });
  };

  closeProfilePopUp = () => {
    this.setState({ showProfilePopUp: false });
  };

  displayImg = () => {
    this.setState({ showFile: true });
  };

  displayIcon = () => {
    this.setState({ showFile: false });
  };

  render() {
    if (this.state.flag) {
      return <Redirect to="/createGroup" />;
    }
    
    return (
      <div className="userHamePage">
        {this.state.user.map((user1, i) => {
         
          return (
            <div key={i}>
              <div className="PersonalInfo">
                <div>
                  <h2>{user1.name}</h2>
                </div>

                <div className="location float-left">
                  <h6>Location:</h6>
                  <span>{user1.city}</span>
                </div>

                <div className="memberSince float-left">
                  <h6>TeamUp member since:</h6>
                  <span>{user1.joiningDate}</span>
                </div>

                <div className="clearfix" />

                <div>
                  <span>Add a bio</span>
                </div>
              </div>

              <div className="float-right profileImgAndIntrests">
                <div>
                  {!this.state.showFile ? (
                    <MdAccountBox className="userProfileIcon" />
                  ) : (
                    <img src={this.state.image} alt="profile" />
                  )}
                </div>

                <div
                  onClick={() => {
                    this.showProfilePopUp();
                  }}
                >
                  Set a profile photo
                </div>

                {this.state.showProfilePopUp ? (
                  <div>
                    <MdClose onClick={this.closeProfilePopUp} />
                    <input
                      type="file"
                      onChange={event =>
                        this.setState({ file: event.target.files[0] })
                      }
                      onClick={() => {
                        this.displayImg();
                      }}
                    />

                    <div>
                      <button
                        onClick={() => {
                          this.displayIcon();
                        }}
                      >
                        Dont show a photo
                      </button>

                      <button
                        onClick={() => {
                          this.loadProfileImage();
                        }}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : null}
                <div>
                  <h6>Intrests:</h6>
                  <span>{this.state.interests.map ((interest, i) => {
                    return (
                      <span key = {i}>{interest} </span>
                    )
                  })}</span>
                </div>
              </div>

              <div>
                <div>
                  <h2>Member of {user1.groups.length - 1} groups</h2>
                </div>
                <DisplayManagerGroups />
              </div>

              <div>
                <button onClick={this.redirectToCreateGroup}>
                  Start a new group
                </button>
              </div>
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
