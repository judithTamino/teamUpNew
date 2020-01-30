import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Login extends Component{

logout = () =>{
    localStorage.clear("token");
    this.props.history.push('/');
}

}