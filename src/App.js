import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/auth/Register";
import Welcome from "./components/auth/Welcome";
import LogIn from "./components/auth/LogIn";
import { Auth } from "aws-amplify";
import { getElementError } from "@testing-library/react";

class App extends Component {
  state = {
    isAuth: false,
    user: null
  };

  authenticateUser = authenticated => {
    this.setState({ isAuth: authenticated });
  };

  setAuthUser = user => {
    console.log(user);
    this.setState({ user: user });
  };

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.authenticateUser(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setAuthUser(user);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const authProps = {
      isAuth: this.state.isAuth,
      user: this.state.user,
      authenticateUser: this.authenticateUser,
      setAuthUser: this.setAuthUser
    };

    return (
      !this.state.checkingAuth && (
        <div className="App">
          <Router>
            <div>
              <Navbar auth={authProps} />
              <Switch>
                <Route exact path="/">
                  <Home auth={authProps} />
                </Route>
                <Route exact path="/register">
                  <Register auth={authProps} />
                </Route>
                <Route exact path="/welcome">
                  <Welcome auth={authProps} />
                </Route>
                <Route exact path="/login">
                  <LogIn auth={authProps} />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      )
    );
  }
}

export default App;
