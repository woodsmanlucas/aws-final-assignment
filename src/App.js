import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import LogIn from './components/auth/LogIn';

class App extends Component {
    state = {
      isAuth: false,
      user: null
    }


  authenticateUser = authenticated => {
    this.setState({isAuth: authenticated})
  }

  setAuthUser = user  => {
    this.setState({user: user})
  }

  render() {
    const authProps = {
      isAuth: this.state.isAuth,
      user: this.state.authenticateUser,
      authenticateUser: this.authenticateUser,
      setAuthUser: this.setAuthUser
    }

    return (
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authProps} />
            <Switch>
              <Route exact path="/">
                <Home auth={authProps} />
              </Route>
              <Route exact path="/register" >
                <Register auth={authProps} />
              </Route>
              <Route exact path="/welcome" component={Welcome} >
                <Welcome auth={authProps} />
              </Route>
              <Route exact path="/login" component={LogIn} >
                <LogIn auth={authProps} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
