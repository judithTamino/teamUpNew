import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import { MdAccountBox } from "react-icons/md";
import { MdClose } from "react-icons/md"
import axios from 'axios';
import './style/UserHomePage.css'
import DisplayManagerGroups from './DisplayManagerGroups';

export default class UserHomePage extends Component {

    state = {
        flag : false, 
        showProfilePopUp: false, 
        file: '', 
        image: '', 
        newFilename: '',
        showFile: false,
    };

    redirectToCreateGroup = () => {
        this.setState ({flag: true});
    }

    showProfilePopUp = () => { 
        this.setState ({showProfilePopUp:true}) 
    };

    closeProfilePopUp = () => { 
        this.setState ({showProfilePopUp:false}) 
    };

    displayImg = () => {
        this.setState ({showFile:true})
    }

    displayIcon = () => {
        this.setState ({ showFile: false })
    }

    loadProfileImage = () => {

        let fromData = new FormData ();
        const config = {headers: {'content-type':'multipart/from-data'}}

        fromData.append ('imgFile', this.state.file);
        fromData.append ('email', localStorage.user);
        if (this.state.file !== "") {
            axios.post ('/users/userHomePage',fromData, config)

            .then (res => {
                if (res.status === 201) {
                    this.setState ({newFilename:res.data.file.filename});
                    this.getProfileImage ();
                } else {
                    console.log (res.status)
                }
            })

            .catch (err => {
                console.log (err);
            });
        }
    }

    getProfileImage = () => {
        axios.get (`/users/userHomePage/${this.state.newFilename}`, {responseType: "blob"})

        .then (res => {
            if (res.status === 200) {
                const reader = new FileReader ();
                reader.readAsDataURL (res.data);
                const _this = this;
                reader.onload = function () {
                    const imageDataUrl = reader.result;
                    _this.setState ({image:imageDataUrl});
                }
            } else {
                console.log (`error statuse code : ${res.status}`);
            }
        }).catch (err => console.log (err));
    }

    render() {
        if (this.state.flag) {
            return <Redirect to = '/createGroup'/>
        }
        return (
            <div>
                <h3 className = 'userName'>{this.props.getUser.name}</h3>
                <div>
                    <div className = "location float-left">
                        Location:
                        <p>{this.props.getUser.city}</p>
                    </div>

                    <div className = "memberSince float-left">
                        TeamUp member since:
                        <p>{this.props.getUser.joiningDate}</p>
                    </div>
                </div>

                <div className = "float-right">
            
                    <div>
                        {!this.state.showFile ? <MdAccountBox style = {{fontSize:72}}/> : <img src = {this.state.image} alt = 'profile'/>}
                        <div onClick = { this.showProfilePopUp }>Set a profile photo</div>

                        {this.state.showProfilePopUp ?
                        <div>
                            <MdClose onClick = {this.closeProfilePopUp}/>

                            <input type = "file" onChange = {
                                e => this.setState ({file: e.target.files[0]})
                            } onClick = {
                                () => {
                                    this.displayImg()
                                }
                            }/>

                            <button onClick = {this.displayIcon}>Don't show a photo</button>

                            <button onClick = {this.loadProfileImage}>Done</button>
                        </div> : null }
                    </div>

                    <div>
                        Intrests:
                        <p>{this.props.getUser.interests}</p>
                    </div>
    
                </div>

                <div className = "clearfix"/>

                <div >
                    <button  onClick = {this.redirectToCreateGroup }>Start a new group</button>
                </div>

                <DisplayManagerGroups/>
            </div>
        );
  }
}
