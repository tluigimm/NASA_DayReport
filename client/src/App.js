import './App.css';
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Login from './login';
import Main from './main';
import Logged from './logged';
import Signin from './signin';
import Dates from './dates';
import { BrowserRouter, Router, Switch, Route, Redirect } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <h1> NASA day report </h1>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Main} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/logged"} component={Logged} />
          <Route exact path={"/signin"} component={Signin} />
          <Route exact path={"/dates"} component={Dates}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
