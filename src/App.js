import React from "react";
import Dashboard from "./components/dashboard";
import "./App.css";
import { Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </div>
  );

}

export default App;
