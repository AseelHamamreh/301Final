import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './cpmponents/Home';
import Favorite from './cpmponents/Favorite'
export class App extends Component {
  render() {
    return (
      <div>
         <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home page</Link>
            </li>
            <li>
              <Link to="/favorite">favorite page</Link>
            </li>
  
          </ul>
        </nav>

        <Switch>
          <Route path="/favorite">
            <Favorite />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
      </div>
    )
  }
}

export default App
