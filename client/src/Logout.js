import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';

export default class Login extends Component{
state = {isError: false}

logout = () =>{
    localStorage.clear("token");
    this.setState({isError:false});
    axios.post('/users/login', {
      email:this.state.email, 
      password: this.state.password
    })
    .then(res =>{
      // console.log(res);
      if (res.status === 200){
        this.setState({redirectTOhome:true});
        localStorage.setItem ('user', this.state.email);
      }else{
        this.setState({isError:true})
        console.log(`error code : ${res.status}`);
        
      }

    })
    .catch(err =>{
      this.setState({isError:true})
      console.log(err);
    })
}

}