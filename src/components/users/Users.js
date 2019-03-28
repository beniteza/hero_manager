import React, { Component } from "react";
import User from "./User"; //Bring in Hero component to use here.

import { Consumer } from "../../context";

class Users extends Component {
  //Create state. Could use constructor but save it for when you need to init stuff
  //State now in Context

  render() {
    return (
      <Consumer>
        {value => {
          const { users } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-danger">User</span> List
              </h1>
              {users.map(user => (
                <User key={user.id} user={user} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Users;
