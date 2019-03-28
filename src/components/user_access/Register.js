import React, { Component } from "react";

import TextInputGroup from "../layout/TextInputGroup";

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

  onSubmit = async e => {
    e.preventDefault();
    const { username, password, confirm } = this.state;

    //Check for errors
    if (username === "") {
      this.setState({
        errors: { name: "Username is required" }
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
        errors: { password: "Password confirmation is required" }
      });
      return;
    }

    const user = {
      username,
      password,
      confirm
    };

    await axios.post("http://localhost:5000/register", qs.stringify(user));

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
      <div className="card mb-3">
        <div className="card-header">Register</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit.bind(this)}>
            <TextInputGroup
              label="Username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.onChange}
              errors={errors.name}
            />
            <TextInputGroup
              type="password"
              label="Password"
              name="password"
              placeholder=""
              value={password}
              onChange={this.onChange}
              errors={errors.ability}
            />
            <TextInputGroup
              type="password"
              label="Confirm Password"
              name="confirm"
              placeholder=""
              value={confirm}
              onChange={this.onChange}
              errors={errors.ability}
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
  }
}

export default Register;
