import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./style/EditGroup.css";

import moment from "moment";

export default class EditGroup extends Component {
  oldMeetingDate = moment(this.props.location.state.editGroup.date).format();
  state = {
    redirectToProfile: false,
    id: this.props.location.state.id,
    group: this.props.location.state.editGroup,

    date: new Date(this.props.location.state.editGroup.date),
    startTime: this.props.location.state.editGroup.startTime,
    endTime: this.props.location.state.editGroup.endTime,
    street: this.props.location.state.editGroup.street,
    streetNumber: this.props.location.state.editGroup.streetNumber,
    city: this.props.location.state.editGroup.city,
    groupName: this.props.location.state.editGroup.groupName,

    isAllLetters: true,
    isValidMeetingDate: true,
    isValidEndTime: true,
    isValidStartTime: true,
    isUpdate: false
  };

  error = { border: "1px solid red" };

  allLetters = e => {
    if (e.target.value.match(/^[א-תA-Za-z\s\W]+$/)) {
      this.setState({ isAllLetters: true });
    } else {
      this.setState({ isAllLetters: false });
    }
  };

  validMeetingDate = e => {
    const date = new Date();
    let day = ("0" + date.getDate()).slice(-2),
      mounth = ("0" + (date.getMonth() + 1)).slice(-2),
      year = date.getFullYear();
    let currentDate = `${year}-${mounth}-${day}`;

    if (e.target.value < currentDate) {
      this.setState({ isValidMeetingDate: false });
    } else {
      this.setState({ isValidMeetingDate: true });
    }
  };

  validEndingMeetingTime = e => {
    if (this.state.startTime > e.target.value) {
      this.setState({ isValidEndTime: false });
    } else {
      this.setState({ isValidEndTime: true });
      this.setState({ isValidStartTime: true });
    }
  };

  validstartingMeetingTime = e => {
    if (this.state.endTime < e.target.value) {
      this.setState({ isValidStartTime: false });
    } else {
      this.setState({ isValidStartTime: true });
      this.setState({ isValidEndTime: true });
    }
  };

  editGroup = () => {
    if (
      this.state.isValidMeetingDate &&
      this.state.isValidEndTime &&
      this.state.isAllLetters &&
      this.state.isValidStartTime
    ) {
      axios
        .patch(`/groups/editGroup/${this.state.id}`, {
          date: this.state.date,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          street: this.state.street,
          streetNumber: this.state.streetNumber,
          city: this.state.city,
          groupName: this.state.groupName
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({ isUpdate: true });
            setTimeout(() => {
              this.setState({ isUpdate: false });
            }, 5000);
          } else {
            console.log("bad");
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert("Something went worng");
    }
  };

  render() {
    console.log(this.oldMeetingDate);
    console.log();
    if (this.state.redirectToProfile) {
      return <Redirect to="/userHomePage" />;
    }
    return (
      <div className="editGroup">
        <div className="EditGroup-Info">
          <h2 className="EditGroup-MainTitle">Edit your group</h2>
          {this.state.isUpdate ? (
            <h5 style={{ color: "#007944" }}>
              Your group has been change successfully
            </h5>
          ) : null}

          <div>
            <h5 className="EditGroup-DateTitle">Date:</h5>
            <input
              className="EditGroup-DateInput"
              type="date"
              defaultValue={this.state.group.date}
              onChange={event => {
                this.setState({ date: event.target.value });
                this.validMeetingDate(event);
              }}
              style={!this.state.isValidMeetingDate ? this.error : null}
            />

            <span
              className="EditGroup-EditBtn"
              onClick={() => {
                this.editGroup();
              }}
            >
              Edit
            </span>
          </div>

          <div>
            <h5 className="EditGroup-TimeTitle">Time:</h5>
            <span className="EditGroup-TimeText-From">From</span>{" "}
            <input className="EditGroup-TimeInput"
              type="time"
              defaultValue={this.state.group.startTime}
              onChange={event => {
                this.setState({ startTime: event.target.value });
                this.validstartingMeetingTime(event);
              }}
              style={!this.state.isValidStartTime ? this.error : null}
            />
            <span className="EditGroup-TimeText-To">To</span>{" "}
            <input className="EditGroup-TimeInput"
              type="time"
              defaultValue={this.state.group.endTime}
              onChange={event => {
                this.setState({ endTime: event.target.value });
                this.validEndingMeetingTime(event);
              }}
              style={!this.state.isValidEndTime ? this.error : null}
            />
            <span className="EditGroup-EditBtn"
              onClick={() => {
                this.editGroup();
              }}
            >
              Edit
            </span>
          </div>

          <div>
            <h5 className="EditGroup-LocationTitle">Location:</h5>
            <input className="EditGroup-LocationInput"
              type="text"
              defaultValue={this.state.group.street}
              onChange={event => {
                this.setState({ street: event.target.value });
                this.allLetters(event);
              }}
              style={!this.state.isAllLetters ? this.error : null}
            />
            <input className="EditGroup-LocationInput"
              type="number"
              defaultValue={this.state.group.streetNumber}
              onChange={event => {
                this.setState({ streetNumber: event.target.value });
              }}
            />
            <input className="EditGroup-LocationInput"
              type="text"
              defaultValue={this.state.group.city}
              onChange={event => {
                this.setState({ city: event.target.value });
                this.allLetters(event);
              }}
              style={!this.state.isAllLetters ? this.error : null}
            />
            <span className="EditGroup-EditBtn"
              onClick={() => {
                this.editGroup();
              }}
            >
              Edit
            </span>
          </div>

          <div>
            <h5 className="EditGroup-GroupTitle">Group Name:</h5>
            <input className="EditGroup-GroupInput"
              type="text"
              defaultValue={this.state.group.groupName}
              onChange={event => {
                this.setState({ groupName: event.target.value });
                this.allLetters(event);
              }}
              style={!this.state.isAllLetters ? this.error : null}
            />

            <span className="EditGroup-EditBtn"
              onClick={() => {
                this.editGroup();
              }}
            >
              Edit
            </span>
          </div>
        </div>
      </div>
    );
  }
}
