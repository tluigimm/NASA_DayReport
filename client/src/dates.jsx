import './App.css';
import React, { useState, Component} from "react";
import Axios from 'axios';
import {BrowserRouter as Router,Route, Redirect,Switch} from 'react-router-dom';

export default class Dates extends Component {
  constructor(props){
    super(props);
    this.state = {
      dates: [],
      userId: this.props.location.state.userId,
      username: this.props.location.state.uname 
    };
  }

  componentWillMount(){
    Axios.post('http://localhost:7002/get_dates', {
      id: this.state.userId
    }).then((res) => {
      let x = [];
      for (var d in res.data){
        var date = res.data[d].date;
        let year = date.slice(0, 4);
        let mounth = date.slice(5, 7);
        let day = date.slice(8, 10);
        console.log(day+"/"+mounth+"/"+year);
        x.push(<div>{day}/{mounth}/{year} <button> go to date </button></div>);}
      this.setState({dates: x});
      console.log(this.state.dates);
  })};

  render() {
    return (
      <div className="App">
        <h2> {this.state.username} dates </h2>
        {this.state.dates}       
      </div>
    );
}};
