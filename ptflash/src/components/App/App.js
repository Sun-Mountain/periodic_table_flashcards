import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';

/* Route Imports */
import Quiz from '../Quiz/Quiz'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }
  }

  render() {
    return (
        <div>
          <nav id="nav-main">
            <img id="logo" alt="logo" src="periodic-table.svg" />
            <Link to="/" className="nav-main-link">
              <h1>Quiz</h1>
            </Link>
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
