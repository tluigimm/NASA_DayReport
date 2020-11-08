import './App.css';
import React, { useState, Component} from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class Logged extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: this.props.location.state.userId,
      uname: this.props.location.state.uname,
      date: '',
      neoList: [],
      urlImage: '',
      imageTitle: '',
      imageText: '',
      neos: [],
      ti: true
    };
  }

  render() {
    const sendDate = () => {
        Axios.post('http://localhost:7002/send_date', {
          d: this.state.date
        }).then((res) => {
          var neoJson = res.data.resNeows.near_earth_objects;
          for (var key in neoJson) {
            this.setState({neoList: neoJson[key]});
          }
          this.setState({urlImage: res.data.resApod.url});
          this.setState({imageTitle: res.data.resApod.title});
          this.setState({imageText: res.data.resApod.explanation});

          var n = this.state.neos;
          for (let neo of this.state.neoList) {
            n.push( <div>
              name: {neo.name} <br/>
              average estimated diameter (m): {(neo.estimated_diameter.meters.estimated_diameter_min 
                                                 + neo.estimated_diameter.meters.estimated_diameter_max) / 2}<br/>
              relative velocity (km/s): {neo.close_approach_data[0].relative_velocity.kilometers_per_second}<br/>
              miss distance (astronomical): {neo.close_approach_data[0].miss_distance.astronomical}<br/>
              orbiting body: {neo.close_approach_data[0].orbiting_body}<br/>
              absolute magnitude (h): {neo.absolute_magnitude_h}<br/><br/>
            </div>)};
          this.setState({neos: n});
    })};
    
    const seeDates = () => {
        this.props.history.push({pathname:'/dates', state: {
          userId: this.state.userId,
          uname: this.state.uname
    }})}

    const addDate = () => {
        Axios.post('http://localhost:7002/add_date', {
          id: this.state.userId,
          d: this.state.date
        })};
    
    return (
      <div className="App">
        Hello {this.state.uname}! <br />
        <Link to="/"> log out </Link> <br />
        <button onClick={seeDates}> see your dates </button>
        <h2> Enter date: </h2>
        <input type="date" name="date"
          placeholder="yyyy-mm-dd" onChange={(e)=> {
            this.setState({date: e.target.value})
        }}/>
        <button onClick={sendDate}> send </button>
        <br/><center>
          <h3>{this.state.imageTitle}</h3>
          <img src={this.state.urlImage}/>
          <button onClick={addDate} > add date </button>
          <p>{this.state.imageText}</p>
        </center> <br/>
        {this.state.neos}
      </div>
    );
  };
}
