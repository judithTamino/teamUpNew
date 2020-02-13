import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import {MdInfo, MdLockOpen, MdLockOutline} from "react-icons/md";
import axios from "axios";

export default class DisplayGroupsByCategory extends Component {
    state = {
        categoryId:this.props.location.state.id,
        category:[],
        groups:[],
        redirectToGroupInfo:false,
    }

    getSelectCategory = () => {
        axios.get (`/categories/findCategoryById/${this.props.location.state.id}`)
        .then (res => {
            if (res.status === 200) {
                this.setState ({category:res.data});
            } else {
                throw res.status;
            }
        }).catch (err => {
            console.log (err);
        })
    }

    getGroupByCategory = () => {
        axios.get (`/groups/getGroupByCategory/${this.props.location.state.id}`)
        .then(res => {
            if (res.status === 200) {
                this.setState ({groups:res.data})
            } else {
                throw res.status;
            }
        })
        .catch(err => {
            console.log (err);
        })
    }

  render() {
      if (this.state.redirectToGroupInfo) {
          return <Redirect to = {{
              pathname:'/groupInfo',
              state:{id:localStorage.groupId}
          }}/>
      }
    return (
        <div> 
            <h1>Explore {this.state.category.name}</h1>
            <p>Find out what's happening in {this.state.category.name} groups around the world and start meeting up with the ones near you.</p>
            {this.state.groups.map((group, i) => {
                return (
                    <div key = {i}>
                        <h5>{group.groupName}</h5>
                        <h6>{group.members.length} members</h6>
                        {/* <p>{group.description}</p> */}
                        <div>
                            <div onClick = {() => {
                                localStorage.setItem ('groupId', group._id);
                                this.setState ({redirectToGroupInfo:true});
                            }}>
                                <MdInfo/> <span>Info</span>
                            </div>
                            <div>
                                {group.groupStatus === 'open'? 
                                    <MdLockOpen/> : 
                                    <MdLockOutline/>}
                                    <span>{group.groupStatus}</span>
                                {/* <MdAddCircle/> <span>Join</span> */}
                            </div>  
                        </div>
                        <hr/>
                    </div>
                )
                
            })}
        </div>
    );
  }

  componentDidMount () {
    this.getSelectCategory();
    this.getGroupByCategory();
  }
}
