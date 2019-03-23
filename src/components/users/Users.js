import React, { Component } from "react";
import User from "./User"; //Bring in Hero component to use here.

import { Consumer } from "../../context";

class Users extends Component {
  //Create state. Could use constructor but save it for when you need to init stuff
  //State now in Context

  render() {
    return (
      <Consumer>
        {/* Value comes from the Context Provider, so it has the state */}
        {value => {
          const { heroes } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-danger">Hero</span> List
              </h1>
              {/* Loop through the array */}
              {/* Pass the state vals to the Hero component */}
              {heroes.map(hero => (
                <Hero key={hero.id} hero={hero} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Users;
