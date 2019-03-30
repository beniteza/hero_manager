import React, { Component } from "react";

import TextInputGroup from "../layout/TextInputGroup";
import { Consumer } from "../../context";

import axios from "axios";
import qs from "qs";

class Register extends Component {
  state = {
    username: "",
    password: "",
    confirm: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (users, e) => {
    e.preventDefault();
    const { username, password, confirm } = this.state;

    //Check for errors
    if (username === "") {
      this.setState({
        errors: { username: "Username is required" }
      });
      return;
    }
    if (password === "") {
      this.setState({
        errors: { password: "Password is required" }
      });
      return;
    }
    if (confirm === "") {
      this.setState({
        errors: { confirm: "Password confirmation is required" }
      });
      return;
    }
    if (confirm !== password) {
      this.setState({
        errors: { confirm: "Passwords do not match" }
      });
      return;
    }

    //Check if the username is taken
    let isTaken = false;
    users.forEach(user => {
      if (user.username === username) {
        isTaken = true;
      }
    });
    if (isTaken) {
      this.setState({
        errors: { username: `${username} is already taken` }
      });
      return;
    }

    const newUser = {
      username,
      password,
      confirm
    };

    await axios.post("/register", qs.stringify(newUser));

    //CLEAR STATE AKA CLEAR WHAT'S ON THE FORM
    this.setState({
      username: "",
      password: "",
      confirm: "",
      errors: {}
    });

    //REDIRECT
    this.props.history.push("/login");
  };

  render() {
    const { username, password, confirm, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { users } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Register</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, users)}>
                  <TextInputGroup
                    label="Username"
                    name="username"
                    placeholder=""
                    value={username}
                    onChange={this.onChange}
                    errors={errors.username}
                  />
                  <TextInputGroup
                    type="password"
                    label="Password"
                    name="password"
                    placeholder=""
                    value={password}
                    onChange={this.onChange}
                    errors={errors.password}
                  />
                  <TextInputGroup
                    type="password"
                    label="Confirm Password"
                    name="confirm"
                    placeholder=""
                    value={confirm}
                    onChange={this.onChange}
                    errors={errors.confirm}
                  />
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-block btn-primary"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Register;
