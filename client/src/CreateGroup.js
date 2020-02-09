import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaRegCalendar, FaRegClock, FaArrowRight, FaLocationArrow} from "react-icons/fa";
import './style/createGroup.css';



export default class CreateGroup extends Component {
  
  user = localStorage.getItem("user");

  state = {
    groupManager: this.user,
    groupName:"",
    street:"",
    streetNumber:"",
    city:"",
    date: new Date(),
    beginningTime:"",
    endingTime:"",
    category:"",
    topic:"",
    description:"",
    joiningDate: new Date (),
    status:"open",

    isAllLetter: true, isSelectCategory: false, isValidDate: true,
    isValidEndTime: true, isValidStartTime: true, 

    redirectToUserHomePage: false,

    arrCategories:[],
  };
  error = { border: "1px solid red" };
  timeError = {color: "red"};

  newDate = new Date ();
  curnnetTime = `${this.newDate.getHours}:${this.newDate.getSeconds}`;

  createGroup = () => {
     if (this.state.isValidDate && this.state.isValidStartTime && this.state.isValidEndTime && this.state.isSelectCategory && this.state.isAllLetter) {
        axios.post ('/groups/createGroup', {
            groupManager: this.state.groupManager,
            groupName: this.state.groupName,
            street: this.state.street,
            streetNumber: this.state.streetNumber,
            city: this.state.city,
            date: this.state.date,
            startTime: this.state.beginningTime,
            endTime: this.state.endingTime,
            category: this.state.category,
            topic: this.state.topic,
            description: this.state.description,
            joiningDate: this.state.joiningDate,
            status: this.state.status
        })
        .then (res => {
          if (res.status === 201) {
              this.redirectToUserHomePage ();
          }
        }).catch (err => {
          console.log (err)
        });
    } else {alert ('One or more of the fields are empty')}
  };

  redirectToUserHomePage = () => {
    this.setState ({redirectToUserHomePage:true});
  }

  allLetter = e => {
    if (e.target.value.match(/^[א-תA-Za-z\s\W]+$/)) {
      this.setState({ isAllLetter: true });
    } else {
      this.setState({ isAllLetter: false });
    }
  };

  selectCategory = () => {
    if ( this.state.category === " ") this.setState({ isSelectCategory: false });
    else {
      this.setState({ isSelectCategory: true });
    }
  };

  validEndingMeetingTime = e => {
    if (this.state.beginningTime > e) {
      this.setState({ isValidEndTime: false });
    } else {
      this.setState({ isValidEndTime: true });
      this.setState({ isValidStartTime: true });
    }
  };

  validstartingMeetingTime = e => {
    if (this.state.endingTime < e) {
      this.setState({ isValidStartTime: false });
    } else {
      this.setState({ isValidStartTime: true });
      this.setState({ isValidEndTime: true });
    }
  };

  getCategories = () => {
    axios
      .get("/categories/getCategories")
      .then(res => {
        if (res.status === 200) {
          this.setState({ arrCategories: res.data });
        } else {
          throw res.status;
        }
      })
      .catch(err => {
        throw err;
      });
  };
  onChange = date => this.setState ({date:date})
  
  render() {
    const disabled = !this.state.date || !this.state.endingTime || !this.state.beginningTime || !this.state.city || !this.state.streetNumber || !this.state.street || !this.state.groupName || !this.state.topic || !this.state.description;
     
    if (this.state.redirectToUserHomePage) {
      return <Redirect to="/userHomePage" />;
    }

    return (
      <div>
        <form>
          <div>
            <h1>Start a new group</h1>

            <div>
              <div>
                <span>
                  <FaRegCalendar/>
                </span>
                <DatePicker className="form-control datepicker" 
                  selected = {this.state.date}
                  onChange = {
                    e => {
                      this.setState ({date:e})}
                  }
                  todayButton="Today"
                  placeholderText="Click to select a date"
                  minDate = {new Date ()}
                  dateFormat = 'dd/MM/yyyy'
                  highlightDates = {new Date ()}
                />
              </div>

              <div>
                <span>
                  <FaRegClock style={!this.state.isValidStartTime ? this.timeError : null}/>
                </span>
                <TimePicker
                  value = {this.state.beginningTime}
                  disableClock = {true}
                  minTime = '06:00'
                  maxTime = '23:00'
                  onChange = {
                    e => {
                      this.setState ({beginningTime:e})
                      this.validstartingMeetingTime(e);
                    }
                  } 
                  required
                />

                <span>
                  <FaArrowRight/>
                </span>
                
                <TimePicker
                  value = {this.state.endingTime}
                  disableClock = {true}
                  minTime = '06:00'
                  maxTime = '23:00'
                  onChange = {
                    e => {
                      this.setState ({endingTime: e})
                      this.validEndingMeetingTime(e);
                    }
                  }
                  required
                />
              </div>

              <div>
                <span>
                  <FaLocationArrow/>
                </span>
                <input
                  type="text"
                  placeholder="Street"
                  onChange={e => {
                    this.setState({ street: e.target.value });
                    this.allLetter(e);
                  }}
                  style = {!this.state.isAllLetter ? this.error : null}
                  required
                />
                <input
                  type="number"
                  placeholder="Street number"
                  onChange={e =>
                    this.setState({ streetNumber: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  onChange={e => {
                    this.setState({ city: e.target.value });
                    this.allLetter(e);
                  }}
                  style = {!this.state.isAllLetter ? this.error : null}
                  required
                />
              </div>
            </div>

            <hr />

            <div>
              <input
                type="text"
                placeholder="Group name"
                onChange={e => {
                  this.setState({ groupName: e.target.value });
                  this.allLetter(e);
                }}
                style = {!this.state.isAllLetter ? this.error : null}
                required
              />
            </div>

            <div>
              <select
                onChange={e => {
                  this.setState({ category: e.target.value});
                  this.selectCategory(e);
                }}
              >
                <option disabled > Select category</option>
                {this.state.arrCategories.map((cat, i) => {
                  return <option value={cat._id} key={i}>{cat.name}</option>;
                })}
              </select>
            </div>

            <div>
              <input
                type="text"
                placeholder="Topic"
                onChange={e => {
                  this.setState({ topic: e.target.value });
                  this.allLetter(e);
                }}
                style = {!this.state.isAllLetter ? this.error : null}
                required
              />
            </div>

            <div>
              <textarea
                placeholder="Description"
                maxLength="300"
                rows="4"
                cols="50"
                onChange={e => {
                  this.setState({ description: e.target.value });
                  this.allLetter(e);
                }}
                style = {!this.state.isAllLetter ? this.error : null}
                required
              />
            </div>

            <button
              onClick={() => {
                this.createGroup();
              }}
              disabled = {disabled}
            >
              Create group
            </button>
            <button onClick={this.redirectToUserHomePage}>Profile</button>
          </div>
        </form>
      </div>
    );
  }
  componentDidMount() {
    this.getCategories();
    this.selectCategory();
  }
}
