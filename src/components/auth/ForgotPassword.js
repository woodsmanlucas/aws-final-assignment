import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../util/Validation";
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';

class ForgotPassword extends Component {
  state = {
    email: "",
    errors: {
      blankfield: false
    }
  };

  clearErrors = () => {
    this.setState({
      errors: {
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    //Prevent page reload
    event.preventDefault();
    
    //Form validation
    this.clearErrors();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }
    //Integrate Cognito here on valid form submission
    const {username} = this.state;

    try{
      await Auth.forgotPassword(username)
      this.props.history.push("/forgotpasswordsubmit");
    } catch (error){
      let err = null
      !error.message ? err = {"message": error} : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      })
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Forgot Password?</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <input 
                  className="input" 
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Reset Password
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default withRouter(ForgotPassword);