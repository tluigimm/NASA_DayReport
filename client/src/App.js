import './App.css';
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import {BrowserRouter as Router, Route, Redirect} from
'react-router-dom'

function App() {

  const [date, setDate] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [imageText, setImageText] = useState('');
  const [neoList, setNeoList] = useState('');
  let neos = [];

  const sendDate = () => {
    Axios.post('http://localhost:7002/send_date', {
      d: date
    }).then((res) => {
      var neoJson = res.data.resNeows.near_earth_objects;
      for (var key in neoJson) {
        setNeoList(neoJson[key])
      }

      setUrlImage(res.data.resApod.url);
      setImageTitle(res.data.resApod.title);
      setImageText(res.data.resApod.explanation);
    });
  };

  
  for (let neo of neoList) {
    neos.push(<div>
      name: {neo.name} <br/>
      average estimated diameter (m): {(neo.estimated_diameter.meters.estimated_diameter_min 
                                         + neo.estimated_diameter.meters.estimated_diameter_max) / 2}<br/>
      relative velocity (km/s): {neo.close_approach_data[0].relative_velocity.kilometers_per_second}<br/>
      miss distance (astronomical): {neo.close_approach_data[0].miss_distance.astronomical}<br/>
      orbiting body: {neo.close_approach_data[0].orbiting_body}<br/>
      absolute magnitude (h): {neo.absolute_magnitude_h}<br/><br/>
    </div>
    );
  }

  return (
    <div className="App">
      <h1> NASA day report </h1>
      <h2> Enter date: </h2>
      <input type="date" name="date"
        placeholder="yyyy-mm-dd" onChange={(e)=> {
        setDate(e.target.value)
      }}/>
      <button onClick={sendDate}> send </button>
      <br/><center>
        <h3>{imageTitle}</h3>
        <img src={urlImage}/>
        <p>{imageText}</p>
      </center> <br/>
      {neos}
    </div>
  );
}

export default App;
