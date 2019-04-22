import React, { Component } from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';

/* Route Imports */
import Home from '../Home/Home'

class App extends Component {
  render() {
    return (
        <div>
          <nav>
            <Link to="/" className="link">
              <h1>Flashcards</h1>
            </Link>
          </nav>
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </main>
        </div>
    );
  }
}

export default App;
