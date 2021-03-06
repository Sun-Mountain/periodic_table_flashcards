import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';

/* Route Imports */
import Quiz from '../Quiz/Quiz'

class App extends Component {

  render() {
    return (
        <div>
          <nav id="nav-main">
            <img id="logo" alt="logo" src="periodic-table.svg" />
          </nav>
          <main>
            <Switch>
              <Route path="/" exact render={() => (
                <Quiz />
              )} />
            </Switch>
          </main>
        </div>
    );
  }
}

export default App;
