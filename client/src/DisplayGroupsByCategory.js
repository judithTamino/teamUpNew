import React, { Component } from 'react';
import axios from "axios";

export default class DisplayGroupsByCategory extends Component {
    state = {
        categoryId:this.props.location.state.id,
        category:[],
        groups:[],
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
    return (
        <div> 
            <h1>Explore {this.state.category.name}</h1>
            <p>Find out what's happening in {this.state.category.name} groups around the world and start meeting up with the ones near you.</p>
            {this.state.groups.map((group, i) => {
                return (
                    <div key = {i}>
                        <h5>{group.groupName}</h5>
                        <h6>{group.members.length} members</h6>
                        <p>{group.description}</p>
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
