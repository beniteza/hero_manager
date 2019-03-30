import React, { Component } from "react";

import { Consumer } from "../../context";

import axios from "axios";

class Logout extends Component {
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    axios.get("/logout");
    dispatch({ type: "LOGGED_USER", payload: {} });
    dispatch({ type: "IS_LOGGED_IN", payload: false });
    this.props.history.push("/");
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Logout</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <input
                    type="submit"
                    value="Logout"
                    className="btn btn-block btn-warning"
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

export default Logout;
