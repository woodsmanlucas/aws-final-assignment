import React, { Component } from "react";

export default class Navbar extends Component {
  logOutHandler = async e => {
    e.preventDefault();
    try {
      this.props.auth.authenticateUser(false);
      this.props.auth.setAuthUser(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {console.log(this.props.auth.user)}
              {this.props.auth.isAuth && this.props.auth.user && (
                <p>Hello {this.props.auth.user.username}</p>
              )}
              <div className="auth-buttons">
                {this.props.auth.isAuth ? (
                  <button
                    onClick={this.logOutHandler.bind(this)}
                    className="button is-light"
                  >
                    Log out
                  </button>
                ) : (
                  <>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                      Log in
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
