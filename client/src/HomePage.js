import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import "./style/HomePage.css";
import axios from "axios";


export default class HomePage extends Component {
    state = {
        arrCategories: [],
        redirectToCategoryPage:false,
        category:[],
    }

    getCategories = () => {
        axios.get ('/categories/getCategories')
        .then (res => {
            if (res.status === 200) {
                this.setState ({arrCategories: res.data});
            } else {
                throw res.status;
            }
        })
        .catch (err => {
            throw err;
        });
    }

    render() {
        if (this.state.redirectToCategoryPage) {
            return <Redirect to = {{
                pathname:'/displayGroupsByCategory',
                state: {id:localStorage.categoryId}
            }}/>
        }

        return (
            <div className = 'homePage'>
                <div>
                    <h1>The real world is calling</h1>
                    <h5>Join a local group to meet people, try somthing new, or do more of what you love</h5>
                </div>

                <div>
                    <div>
                        <h5>Categories</h5>
                        <span className = 'pageDescription'>Browse groups by topics you're interested in </span>
                        {this.state.arrCategories.map ((category, i) => {
                            return (
                                <div key = {i} className = 'categoryDiaplay' onClick = {
                                    () => {
                                        localStorage.setItem ('categoryId', category._id);
                                        this.setState({redirectToCategoryPage:true});
                                    }
                                }>
                                    <div>Image</div>
                                    <span>{category.name}</span>
                                </div>
                            )
                        }) }
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount () {
        this.getCategories();
    }
}
