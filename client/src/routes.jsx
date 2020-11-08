import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Login from './login'
import Main from './main'

export default props => ( 
  <Router>
    <Route path='/main' component={Main} />
    <Redirect from="*" to='main'/>
  </Router>
)
