import './App.css';
import React, { useState, Component} from "react";
import Axios from 'axios';
import {BrowserRouter as Router,Route, Redirect,Switch} from 'react-router-dom';


export default class Signin extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      user: []
    };
  }

  render() {
    const addUser = () => {
      Axios.post('http://localhost:7002/add_user', {
        u: this.state.username,
        p: this.state.password
      }).then((res) => {  
        var userArray = res.data;
        if (userArray.length == 1){
          var userId = res.data[0].id;
          var uname = res.data[0].name;
          this.props.history.push({pathname:'/logged', state: {userId: userId, uname: uname}});
        }else{
          alert("username alredy exist");
        }
    })};


    return (
      <div className="App">
        <h2> Sign In </h2>
        username: <input 
          type="text"
          name="user"
          onChange={(e)=> {
            this.setState({username: e.target.value});
        }}/><br /><br />
        password: <input
          type="password"
          name="pswd"
          onChange={(e)=> {
            this.setState({password: e.target.value}) ;
        }}/><br /><br />
        <button onClick={addUser}> submit </button>
      </div>
    );
  }
}
