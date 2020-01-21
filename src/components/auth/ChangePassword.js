import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../util/Validation";
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';

class ChangePassword extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
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
    } else{
    //Integrate Cognito here on valid form submission
    const {oldPassword, newPassword, confirmNewPassword} = this.state;
    try{
      await Auth.changePassword(
          this.props.auth.user,
          oldPassword,
          newPassword
      )
      this.props.history.push("/passwordresetsucess");
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
}

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
          <h1>Change Password?</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="text"
                  id="oldPassword"
                  placeholder="Enter your current password"
                  value={this.state.oldPassword}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="text"
                  id="newPassword"
                  placeholder="Enter your new password"
                  value={this.state.newPassword}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="text"
                  id="confirmNewPassword"
                  placeholder="Confirm your new password"
                  value={this.state.confirmNewPassword}
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

export default withRouter(ChangePassword);