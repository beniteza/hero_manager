import React, { Component } from "react";

import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  //action.type is a string of what it does
  switch (action.type) {
    case "DELETE_HERO":
      return {
        //spead operator
        ...state,
        heroes: state.heroes.filter(hero => hero.id !== action.payload) //payload is data you send w/ your action. This case is the id
      };
    case "ADD_HERO":
      return {
        //spead operator
        ...state,
        //payload is the entire hero
        // action.payload[0] contains the returned obj
        heroes: [action.payload[0], ...state.heroes]
      };
    case "EDIT_HERO":
      return {
        ...state,
        //if current hero id == payload id, update hero, if not then hero = currentHero
        heroes: state.heroes.map(hero =>
          hero.id === action.payload[0].id ? (hero = action.payload[0]) : hero
        )
      };
    default:
      return state;
  }
};

//This is basically our global state. Any component can access/edit/interact with stuff found in the Context
export class Provider extends Component {
  state = {
    heroes: [],
    //dispatch calls the action & is now on the state
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  //GET THE HEROES FROM REST API
  //Lifecycle method & use axios for the fetch (get)
  async componentDidMount() {
    //awaits waits for the async operation to finish
    const res = await axios.get("http://localhost:5000/heroes");
    this.setState({ heroes: res.data });
  }

  render() {
    return (
      //Stuff in value appear everywhere
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

/*
//Hard Coded State
  state = {
    heroes: [
      {
        id: 1,
        name: "Master Chief",
        ability: "Super Soldier",
        power: "5000",
        author: "Bungie"
      },
      {
        id: 2,
        name: "Noble Six",
        ability: "Super Soldier",
        power: "4000",
        author: "Bungie"
      },
      {
        id: 3,
        name: "Arbiter",
        ability: "Elite Warrior",
        power: "4500",
        author: "Bungie"
      }
    ],
    //dispatch calls the action & is now on the state
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };
*/
