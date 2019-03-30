import React, { Component } from "react";
import User from "./User";

import { Consumer } from "../../context";

class Users extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { users } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-primary">User</span> List
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
