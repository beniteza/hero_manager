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

    await axios.post("http://localhost:5000/login", qs.stringify(user));
    // await axios.post(
    //   "http://localhost:5000/login",
    //   { withCredentials: true },
    //   qs.stringify(user)
    // );
    // await axios("http://localhost:5000/login", {
    //   method: "post",
    //   data: JSON.stringify(qs.stringify(user)),
    //   withCredentials: true,
    //   headers: {
    //     Accept: "application/json",
    //     "Access-Control-Allow-Credentials": "true",
    //     "Content-Type": "application/json",
    //     credentials: "true"
    //   }
    // });

    // dispatch({ type: "IS_LOGGED_IN", payload: res.data });
    dispatch({ type: "IS_LOGGED_IN", payload: true });

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
