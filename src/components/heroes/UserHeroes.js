import React, { Component } from "react";
import Hero from "./Hero"; //Bring in Hero component to use here.
import axios from "axios";
import { Consumer } from "../../context";

class UserHeroes extends Component {
  state = {
    heroes: []
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(`/user/heroes/${id}`);
    this.setState({
      heroes: res.data
    });
  }

  render() {
    const { heroes } = this.state;
    const { username } = this.props.location.state;
    return (
      <Consumer>
        {value => {
          const { hero_collection } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-primary">{username}'s Hero</span> List
              </h1>
              {heroes.length !== 0 ? (
                heroes.map(hero => (
                  <Hero
                    key={hero.id}
                    hero={hero}
                    hero_collection={hero_collection}
                  />
                ))
              ) : (
                <h2>{username} has no heroes</h2>
              )}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default UserHeroes;
