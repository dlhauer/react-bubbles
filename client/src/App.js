import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';

import Login from "./components/Login";
import "./styles.scss";

function App() {
  localStorage.setItem('token', '')
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute path='/bubbles' component={BubblePage}/>
          <Route exact path="/" component={Login} />
          <Route component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
