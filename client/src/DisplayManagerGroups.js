import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import {AiOutlineTeam } from "react-icons/ai";
import {FaRegTrashAlt} from "react-icons/fa";
import {FaRegEdit} from "react-icons/fa";

export default class DisplayManagerGroups extends Component {

    constructor (props) {
        super (props);
        this.state = { 
            isGroupDeleted: false,
            redirectToEditGroup: false,
            managerGroupsArr:[],
            groupForEdit:[],
            id: '',
        }
    }

    getManagerGroups = () => {
        axios.get (`/groups/${localStorage.user}`)
        .then (res => {
            if (res.status === 200) {
                this.setState ({managerGroupsArr:res.data})
            } else {
                console.log (`error statuse code : ${res.status}`);
            }
        }).catch (err => { console.log (err) });
    }

    deleteGroup = (id, index) => {
        axios.delete (`/groups/${id}`)
        .then(res => {
            if (res.status === 200) {
                let tempGroups = [...this.state.managerGroupsArr];
                tempGroups.splice (index, 1);
                this.setState ({managerGroupsArr:tempGroups});

                this.setState ({isGroupDeleted:true});
            }
        }).catch(err => { console.log (err) });
    }

    getGroupForEdit = (id) => {
        let tempGroups = [...this.state.managerGroupsArr];
        for (let i = 0; i < tempGroups.length; i++) {
            const element = tempGroups[i];
            if (element._id === id) {
                this.setState ({groupForEdit:element});
                this.setState ({id:id});
            }
        }
    }

    render() {
        if (this.state.redirectToEditGroup) {
            return <Redirect to = {{
                pathname: '/editGroup',
                state: {id:this.state.id, editGroup:this.state.groupForEdit}
            }}/>
        }

        return (
            <div> 
                { this.state.isGroupDeleted ? <span style = {{color:'green'}}>Group has been deleted</span> : null }
                {this.state.managerGroupsArr.map ((group, i) => {
                    return (
                        <div key = {i}>
                            <AiOutlineTeam/> 
                            <span>{group.groupName}</span>

                            <div>
                                <FaRegTrashAlt onClick = {() => {
                                    this.deleteGroup (group._id, i);
                                }}/>

                                <span/>   <span/>

                                <FaRegEdit onClick = {() => {
                                    this.setState ({redirectToEditGroup:true});
                                    this.getGroupForEdit (group._id);
                                }}/> 
                            </div>
                        </div>
                    )})}
            </div>
        );
    }

    componentDidMount () {
        this.getManagerGroups ();
    }
}
