import React, { Component } from "react";
import Hero from "./Hero"; //Bring in Hero component to use here.

import { Consumer } from "../../context";

class Heroes extends Component {
  //Create state. Could use constructor but save it for when you need to init stuff
  //State now in Context

  render() {
    return (
      <Consumer>
        {/* Value comes from the Context Provider, so it has the state */}
        {value => {
          const { heroes, hero_collection } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-primary">Hero</span> List
              </h1>
              {/* Loop through the array */}
              {/* Pass the state vals to the Hero component */}
              {heroes.map(hero => (
                <Hero
                  key={hero.id}
                  hero={hero}
                  hero_collection={hero_collection}
                />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Heroes;
