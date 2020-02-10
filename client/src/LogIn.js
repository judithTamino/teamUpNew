import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class LogIn extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      email:'', 
      password :'', 
      redirectTOhome: false, 
      isError:false
    };
  }

  login = () =>{
    this.setState({isError:false});
    axios.post('/users/login', {
      email:this.state.email, 
      password: this.state.password
    })
    .then(res =>{
      if (res.status === 200){
        localStorage.setItem ('user', this.state.email);
        this.setState({redirectTOhome:true});
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

  render() {
    const disabled = !this.state.email || !this.state.password

    if(this.state.redirectTOhome){
      return <Redirect to = "/"/>
    }
    return (
      <div> 
        <h1> Login</h1>
        Email : <input type = "email" onChange = {event => this.setState({email: event.target.value})}></input> <br/>
        Password : <input type = "password" onChange = {event => this.setState({password: event.target.value})}></input> <br/>
        {this.state.isError ? <p style = {{color : 'red'}}>Login error</p> : null}
        <button disabled = {disabled} onClick = {this.login}>Login</button>
      </div>
    );
  }
}
