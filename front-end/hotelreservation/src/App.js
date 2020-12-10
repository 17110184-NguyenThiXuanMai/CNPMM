import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Admin from "./pages/admin";
import DefaultLayout from "./pages/defaultLayout";

function App() {
  return (
    <Switch>
      <Route path='/admin' component={Admin} />
      <Route path='/' component={DefaultLayout} />
    </Switch>
  )
}

export default App;