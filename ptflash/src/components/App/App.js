import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';

/* Route Imports */
import Home from '../Home/Home'
import Quiz from '../Quiz/Quiz'

class App extends Component {

  render() {
    return (
        <div>
          <nav id="nav-main">
            <img id="logo" alt="logo" src="periodic-table.svg" />
            <Link to="/" className="nav-main-link">
              <h1>Flashcards</h1>
            </Link>
            <Link to="/quiz" className="nav-main-link">
              <h1>Quiz Yourself</h1>
            </Link>
          </nav>
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/quiz" exact render={() => (
                <Quiz />
              )} />
            </Switch>
          </main>
        </div>
    );
  }
}

export default App;
