import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MdAccountBox } from "react-icons/md";
import { MdClose } from "react-icons/md"
import axios from 'axios';

export default class UserHomePage extends Component {

    state = {flag : false, showProfilePopUp: false, file: '', imagePath: '', newFilename: ''};

    redirectToCreateGroup = () => {
        this.setState ({flag: true});
    }

    showChangeProfileImage = () => {
        this.setState ({showProfilePopUp:true})
    }

    loadProfileImage = () => {
        let fromData = new FormData ();
        const config = {headers: {'content-type':'multipart/from-data'}}

        fromData.append ('imgFile', this.state.file);
        fromData.append ('email', localStorage.user);

        axios.post ('/users/userHomePage',fromData, config)
        .then (res => {
            if (res.status === 201) {
                this.setState ({newFilename:res.data.file.filename})
            } else (console.log (res.status))
        })
        .catch (err => {
            console.log (err);
        });

        // axios.get (`/profileImg/:${this.filename}`,{responseType: 'blob'})
        // .then (res => {
        //     if (res.status === 200) {
        //         const reader = new FileReader();
        //         reader.readAsDataURL(res.data);
        //         const tempThis = this;

        //         reader.onload = function () {
        //             const imgDataUrl = reader.result;
        //             tempThis.setState ({imagePath:imgDataUrl});
        //         }
        //     } else {
        //         console.log (res.status);
        //     }
        // }).catch (err => {console.log (err)})
    }


    render() {
        if (this.state.flag) {
            return <Redirect to = '/createGroup'/>
        }
        return (
            <div>
                <h3>{this.props.getUser.name}</h3>
                <div>
                    Location:
                    <p>{this.props.getUser.city}</p>
                </div>

                <div>
                    TeamUp member since:
                    <p>{this.props.getUser.joiningDate}</p>
                </div>

                <div>
                    Intrests:
                    <p>{this.props.getUser.interests}</p>
                </div>

                <div>
                    <MdAccountBox style = {{fontSize:72}}/>
                    <div onClick = {this.showChangeProfileImage }>Set a profile photo</div>

                    <div>
                        <MdClose/>
                        <input type = "file" onChange = {
                            e => this.setState ({file: e.target.files[0]})
                        }/>
                        <br/>
                        <img src = {this.state.imagePath} alt = ''/>

                        <button>Don't show a photo</button>
                        <button onClick = {this.loadProfileImage}>Done</button>
                    </div>
                </div>
                <button onClick = {this.redirectToCreateGroup }>Start a new group</button>
            </div>
        );
  }


}
