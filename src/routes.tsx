import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import App from "./app"

export default function Routes () :React.ReactElement {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </Router>
  )
}