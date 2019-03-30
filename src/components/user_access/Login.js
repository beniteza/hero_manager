import React, { Component } from "react";

import TextInputGroup from "../layout/TextInputGroup";
import { Consumer } from "../../context";

import axios from "axios";
import qs from "qs";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { username, password } = this.state;

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

    const user = {
      username,
      password
    };

    const res = await axios.post("/login", qs.stringify(user));

    //Check if login was invalid
    if (res.data === "INVALID") {
      this.setState({
        errors: { username: "INVALID LOGIN", password: "INVALID LOGIN" }
      });
      return;
    }

    const res_2 = await axios.get("/logged");

    dispatch({ type: "LOGGED_USER", payload: res_2.data[0] });
    dispatch({ type: "IS_LOGGED_IN", payload: true });

    this.setState({
      username: "",
      password: "",
      errors: {}
    });

    //REDIRECT
    this.props.history.push("/");
  };

  render() {
    const { username, password, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Login</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
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
                  <input
                    type="submit"
                    value="Login"
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

export default Login;

/*
//Before adding dispatch stuff
class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { username, password } = this.state;

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

    const user = {
      username,
      password
    };

    const res = await axios.post(
      "http://localhost:5000/login",
      qs.stringify(user)
    );

    //CLEAR STATE AKA CLEAR WHAT'S ON THE FORM
    this.setState({
      username: "",
      password: "",
      errors: {}
    });

    //REDIRECT
    this.props.history.push("/");
  };

  render() {
    const { username, password, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Login</div>
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
            <input
              type="submit"
              value="Login"
              className="btn btn-block btn-primary"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
*/
