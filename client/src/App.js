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

  const sendDate = () => {
    Axios.post('http://localhost:7002/send_date', {
      d: date
    }).then((res) => {
      setUrlImage(res.data.resApod.url);
      setImageTitle(res.data.resApod.title);
      setImageText(res.data.resApod.explanation);
    });
  };

  return (
    <div className="App">
      <h1> NASA day report </h1>
      <h2> Enter date: </h2>
      <input type="date" name="date"
        placeholder="yyyy-mm-dd" onChange={(e)=> {
        setDate(e.target.value)
      }}/>
      <button onClick={sendDate}> send </button>
      <center>
        <h3>{imageTitle}</h3>
        <img src={urlImage}/>
        <p>{imageText}</p>
      </center>
    </div>
  );
}

export default App;
