import React from "react";
import "./App.css";
import FormSignup from "./FormSignup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Page/Dashboard";
import { AuthProvider } from "./Handler/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRouter from "./PrivateRouter";
import Edit from "./Page/Edit";
import AddData from "./Page/AddData";
import Riwayat from "./Page/Riwayat";
import Monitoring from "./Page/Monitoring";
import FormLogin2 from "./FormLogin2";
import Flowmeter from "./Page/flowmeter";
import Panel from "./Page/Panel";
import Pressure from "./Page/Pressure";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRouter exact path="/" component={Dashboard} />
          <PrivateRouter path="/edit" component={Edit} />
          <PrivateRouter path="/adddata" component={AddData} />
          <PrivateRouter path="/history" component={Riwayat} />
          <PrivateRouter path="/monitoring" component={Monitoring} />
          <PrivateRouter path="/flowmeter" component={Flowmeter} />
          <PrivateRouter path="/panel" component={Panel} />
          <PrivateRouter path="/pressure" component={Pressure} />
          <Route path="/signup" component={FormSignup} />
          <Route path="/login" component={FormLogin2} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
