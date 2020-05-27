import React from "react";
import "./App.css";
import Customers from "./pages/customers/Customers";
import AlertsMsg from "./components/shared/alerts/Alerts";
import { Route, Switch } from "react-router-dom";
import TestDescription from "./pages/testDescription/TestDescription";
import Navbar from "./components/shared/navbar/Navbar";

function App() {
  return (
    <>
      <AlertsMsg />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Customers} />
        <Route path="/test-description" component={TestDescription} />
      </Switch>
    </>
  );
}

export default App;
