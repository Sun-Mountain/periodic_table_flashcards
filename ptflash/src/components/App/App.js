import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';

/* Route Imports */
import Home from '../Home/Home'
import Cards from '../Cards/Cards'

class App extends Component {
  render() {
    return (
        <div>
          <nav>
            <Link to="/" className="link">
              <h1>Flashcards</h1>
            </Link>
            <Link to="/quiz" className="link">
              <h1>Quiz</h1>
            </Link>
          </nav>
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/quiz" exact component={Cards} />
            </Switch>
          </main>
        </div>
    );
  }
}

export default App;
