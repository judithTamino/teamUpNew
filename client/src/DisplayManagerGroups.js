import React, { Component } from 'react';
import axios from 'axios';

import {MdAccountBox } from "react-icons/md";
import {FaRegTrashAlt} from "react-icons/fa"
import {FaRegEdit} from "react-icons/fa"

export default class DisplayManagerGroups extends Component {
    state = {managerGroupsArr:[], isGroupDeleted: false}

    deleteGroup = (id) => {
        axios.delete (`/groups/${id}`)
        .then(res => {
            if (res.status === 200) {
                this.setState ({isGroupDeleted:true})
            }
        }).catch(err => { console.log (err) });
    }

    render() {
        return (
            <div> 
                {this.state.isGroupDeleted ? <span>Group has been deleted</span> : null}
                {this.state.managerGroupsArr.map ( (group,i) => {
                    return (
                            <div key = {i}>
                                <MdAccountBox/>    
                                <span>{group.groupName}</span>
                                <div>
                                <FaRegTrashAlt onClick = {() => {
                                        this.deleteGroup (group._id)
                                }}/><label>Delete</label>
                                <br/>
                                <FaRegEdit/><label>Edit</label>   
                                </div>
                            </div>
                    );
                })}
            </div>
        );
    }

    componentDidMount () {
        axios.get (`/groups/${localStorage.user}`)
        .then (res => {
            if (res.status === 200) {
                this.setState ({managerGroupsArr:res.data})
            } else {
                console.log (`error statuse code : ${res.status}`);
            }
        }).catch (err => { console.log (err) });
    }

    componentDidUpdate (preProps, preState) {
        // const msg = {preProps: preProps, preState: preState.isGroupDeleted}
        if (preState.isGroupDeleted) {
            // render ();
        }
    }
}
