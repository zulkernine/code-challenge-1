import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Time from "./pages/Time";
import DisplayData from "./pages/Data";
import Currency from "./pages/Cuurrency";

function App() {
  return (
    // Routes for different pages
    <div className="App-body">
      <Router>
        <Switch>
          <Route path="/time">
            <Time />
          </Route>
          <Route path="/data">
            <DisplayData />
          </Route>
          <Route path="/currency">
            <Currency />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
