import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import App from "./pages/App/App";

function ReactRouter() {
  return (
    <Router>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={App} />
    </Router>
  );
}

export default ReactRouter;