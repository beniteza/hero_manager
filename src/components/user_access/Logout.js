import React, { Component } from "react";
import axios from "axios";

class Logout extends Component {
  onLogout = async () => {
    const res = await axios.post("http://localhost:5000/logout");

    //Prob have to clear logged in user from state
    //To Do

    //REDIRECT
    this.props.history.push("/");
  };

  render() {
    return this.onLogout();
  }
}

export default Logout;
