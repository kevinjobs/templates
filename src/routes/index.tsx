import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export default function Routes () :React.ReactElement {
  const [isBannerVisible, setIsBannerVisible] = React.useState(false);

  const Banner = () => (
    <div>
      <p>Hello, I'm a Banner. You can click the button to toggle me.</p>
      <p>I can hold my status while Hot Reloading.</p>
    </div>
  )

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div style={{textAlign:"center"}}>
            <h2>Hello, React!</h2>
            <p>This app is created by React.</p>
            <button onClick={e => setIsBannerVisible(!isBannerVisible)}>Click Me</button>
            { isBannerVisible && Banner() }
          </div>
        </Route>
      </Switch>
    </Router>
  )
}