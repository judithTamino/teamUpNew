import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";


export default class EditProfile extends Component {
    state = {
        isUpdate: false, redirectTOprofile: false,
        city: this.props.location.state.userArr[0].city,
        state: this.props.location.state.userArr[0].state,
        password: this.props.location.state.userArr[0].password
    }

    editProfile = () => {
        axios
            .patch(`/users/editProfile/${localStorage.user}`, {
                city: this.state.city,
                state: this.state.state,
                password: this.state.password
            })
            .then(res => {
                if (res.status === 200) {
                 console.log('Changed');
                }
                else {
                    console.log('wrong');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        if (this.state.redirectTOprofile) {
            return <Redirect to="/userHomePage" />
        }
        return (
            <div>
                <h2>Edit your profile</h2>
                <label> Change city
                    <input
                        type="text"
                        defaultValue={this.state.city}
                        onChange={event => {
                            this.setState({ city: event.target.value });
                        }}
                    ></input>
                </label> <br />

                <label> Change country
                <input
                        type="text"
                        defaultValue={this.state.state}
                        onChange={event => {
                            this.setState({ state: event.target.value });
                        }}
                    ></input>
                </label> <br />

                <label> Change password
                    <input
                        type="password"
                        defaultValue={this.state.password}
                        onChange={event => {
                            this.setState({ password: event.target.value });
                        }}
                    ></input>
                </label> <br />

                <button onClick = {() =>{
                    this.editProfile()
                    this.setState({redirectTOprofile : true})
                    } }>Done</button>
            </div>
        )
    }
}