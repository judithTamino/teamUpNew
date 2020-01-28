import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class CreateGroup extends Component {
    
    date = new Date(); day = this.date.getDate(); mounth = ('0' + (this.date.getMonth()+1)).slice(-2); year = this.date.getFullYear();
    currentDate = `${this.year}-${this.mounth}-${this.day}`;

    testObj = "";

    user = localStorage.getItem ('user');

    state = {
        groupManager: this.user,
        groupName: '',
        street: '',
        streetNumber: '',
        city: '',
        date: '',
        beginningTime: '',
        endingTime: '',
        category: '',
        topic: '',
        description: '',
        joiningDate: this.currentDate,
        status: 'open',

        isAllLetter: true,
        isSelectCategory: "",
        isValidDate: true,
        isValidTime: true,
        redirectToUserHomePage: false
    }

    createGroup = () => {
        if (this.state.isSelectCategory && this.state.isAllLetter && this.state.isValidDate && this.state.isValidTime) {
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
                this.setState ({redirectToUserHomePage:true});
                console.log (res);
            }).catch (err => {console.log (err)});   
        } else {alert ('One or more of the filed are incorrect')}
    }

    allLetter = (e) => {
        if (e.target.value.match (/^[א-תA-Za-z\s\W]+$/) || e.target.value === "" ) { this.setState ({isAllLetter: true})} 
        else { this.setState ({isAllLetter: false}) }
    }

    selectCategory = (e) => {
        if (e.target.value === 'Choose category') this.setState ({isSelectCategory: false});
        else {this.setState ({isSelectCategory: true})}
    }

    validateMeetingDate = (e) => {
        if (e.target.value < `${this.year}-${this.mounth}-${this.day}`) { 
            this.setState ({isValidDate: false})
        }
        else {
            this.setState ({isValidDate: true})
        }
    }

    validateEndingTime = (e) => {
        if (this.state.beginningTime > e.target.value) {
            this.setState ({isValidTime: false});
        } else {this.setState ({isValidTime: true})}

        console.log (`beginnigTime ${this.state.beginningTime }`);
        console.log (e.target.value);
    }

    render() {
        if (this.state.redirectToUserHomePage) {
            return <Redirect to = "/userHomePage"/>
        }
        return (
            <div>
                <form>
                    <div>
                        <h1>Start a new group</h1>

                        <div>
                            <h5> Date & Location </h5>
                            <div>
                                <input type = "date" defaultValue = "2020-01-26" onChange = {
                                    e => {
                                        this.setState ({date:e.target.value})
                                        this.validateMeetingDate (e);
                                    }
                                } required/> {!this.state.isValidDate ? <label> Date does not exist </label> : null }
                            </div>

                            <div>
                                <span>From:</span>
                                <input type = "time" min = "06:00" max = "24:00"  onChange = {
                                    e => {
                                        this.setState ({beginningTime: e.target.value})
                                    }
                                } required/>
                                <span>To:</span>
                                <input type = "time" min = "06:00" max = "24:00" onChange = {
                                    e => {
                                        this.setState ({endingTime: e.target.value})
                                        this.validateEndingTime (e);
                                    }
                                } required/> {!this.state.isValidTime ? <label> Incorrect time </label> : null }
                            </div>

                            <div>
                                <input type = "text" placeholder = "Street" onChange = {
                                    e => {
                                        this.setState ({street: e.target.value})
                                        this.allLetter (e)}
                                } required/>
                                
                                <input type = "number" placeholder = "Street number" onChange = {
                                    e => this.setState ({streetNumber: e.target.value})
                                } required/>

                                <input type = "text" placeholder = "City" onChange = {
                                    e => { 
                                        this.setState ({city: e.target.value})
                                        this.allLetter (e)}
                                } required/>
                            </div>

                        </div>

                        <div>
                            <input type = "text" placeholder = "Group name" onChange = {
                                e => {
                                    this.setState ({groupName: e.target.value})
                                    this.allLetter (e)}
                            } required/>
                        </div>

                        <div>
                            <select onChange = {
                                e => {
                                    this.setState ({category: e.target.value});
                                    this.selectCategory (e);
                                }
                            }>
                                <option>Choose category</option>
                                <option>Sports & Fitnes</option>
                                <option>Learning</option>
                                <option>Food & Drinks</option>
                                <option>Music</option>
                                <option>Film </option>
                                <option>Arts</option>
                                <option>Book</option>
                                <option>Dance</option>
                                <option>Dog Wallking</option>
                                <option>Maternity leave</option>
                                <option>Fashion & Shopping</option>
                                <option>Hobbies & Crafts</option>
                            </select> {!this.state.isSelectCategory ? <p style = {{color: 'red'}}> Choose category </p> : null }
                        </div>

                        <div>
                            <input type = "text" placeholder = "Topic" onChange = {
                                e => {
                                    this.setState ({topic: e.target.value})
                                    this.allLetter (e);
                                }
                            } required/>
                        </div>

                        <div>
                            <textarea placeholder = "Description" maxLength = "300" rows="4" cols="50" onChange = {
                                e => {
                                    this.setState ({description: e.target.value});
                                    this.allLetter (e);
                                }
                            } required/>
                        </div>

                        {!this.state.isAllLetter ? <p style = {{color: 'red'}}> Letters only </p> : null }
                        <button onClick ={this.createGroup}>Create group</button> 
                    </div>
                </form>
            </div>
        );
  }
}
