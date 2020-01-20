import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import LogIn from './components/auth/LogIn';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/welcome" component={Welcome} />
              <Route exact path="/login" component={LogIn} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
