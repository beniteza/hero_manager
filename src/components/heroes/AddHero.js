import React, { Component } from "react";

import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";

//Gens ids (TESTING)
import uuid from "uuid";

import axios from "axios";
import qs from "qs";

class AddHero extends Component {
  //these are the fields of the form
  state = {
    name: "",
    ability: "",
    power: "",
    author: "",
    //for validation
    errors: {}
  };

  onChange = e => {
    //[e.target.name] refers to any of the state/form attrbs. So it changes the one that matches
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (dispatch, e) => {
    //prevent form from submiting any defaults
    e.preventDefault();

    //get vals from local state
    const { name, ability, power, author } = this.state;

    //Validation: Check for errors
    if (name === "") {
      this.setState({
        errors: { name: "Name is required" }
      });
      //stop the Add Hero process
      return;
    }
    if (ability === "") {
      this.setState({
        errors: { ability: "Ability is required" }
      });
      return;
    }
    if (power === "") {
      this.setState({
        errors: { power: "Power is required" }
      });
      return;
    }
    if (author === "") {
      this.setState({
        errors: { author: "Author is required" }
      });
      return;
    }

    //if attributes match, no need to write name: name.
    const newHero = {
      name,
      ability,
      power,
      //REMOVE AUTHOR LATER
      author
    };

    //qs helps send the actual data
    const res = await axios.post(
      "http://localhost:5000/hero/add",
      qs.stringify(newHero)
    );
    //res.data is the hero that's being returned by the backend after the POST
    dispatch({ type: "ADD_HERO", payload: res.data });

    //CLEAR STATE AKA CLEAR WHAT'S ON THE FORM
    this.setState({
      name: "",
      ability: "",
      power: "",
      author: "",
      //Clear errors
      errors: {}
    });

    //REDIRECT
    this.props.history.push("/");
  };

  render() {
    const { name, ability, power, author, errors } = this.state;

    return (
      <Consumer>
        {/* This value contains the entire state from Context. Not this local state. Bringing disptach in allow us to add the new hero */}
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                {/* Pass the dispatch to this onSubmit to add the hero */}
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    // pass the props
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    //value is the one from the state
                    value={name}
                    //w/o this you can't change the state/form attrbs
                    onChange={this.onChange}
                    //pass prop of errors. if there's anything in errors.name it will show up
                    errors={errors.name}
                  />
                  <TextInputGroup
                    // pass the props
                    label="Ability"
                    name="ability"
                    placeholder="Enter Ability"
                    //value is the one from the state
                    value={ability}
                    //w/o this you can't change the state/form attrbs
                    onChange={this.onChange}
                    errors={errors.ability}
                  />
                  <TextInputGroup
                    // pass the props
                    label="Power"
                    name="power"
                    placeholder="Enter Power"
                    //value is the one from the state
                    value={power}
                    //w/o this you can't change the state/form attrbs
                    onChange={this.onChange}
                    errors={errors.power}
                  />
                  <TextInputGroup
                    // pass the props
                    label="Author"
                    name="author"
                    placeholder="Enter Author"
                    //value is the one from the state
                    value={author}
                    //w/o this you can't change the state/form attrbs
                    onChange={this.onChange}
                    errors={errors.author}
                  />
                  <input
                    type="submit"
                    value="Add Hero"
                    className="btn btn-block btn-success"
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

export default AddHero;

/*
//How the input forms used to be before using the TextInputGroup comp:

<div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="name"
                      placeholder="Enter Name"
                      //value is the one from the state
                      value={name}
                      //w/o this you can't change the state/form attrbs
                      onChange={this.onChange}
                    />
                  </div>

*/

/*
//Testing Add Hero

  onSubmit = (dispatch, e) => {
    //prevent form from submiting any defaults
    e.preventDefault();

    //get vals from local state
    const { name, ability, power, author } = this.state;

    //Validation: Check for errors
    if (name === "") {
      this.setState({
        errors: { name: "Name is required" }
      });
      //stop the Add Hero process
      return;
    }
    if (ability === "") {
      this.setState({
        errors: { ability: "Ability is required" }
      });
      return;
    }
    if (power === "") {
      this.setState({
        errors: { power: "Power is required" }
      });
      return;
    }
    if (author === "") {
      this.setState({
        errors: { author: "Author is required" }
      });
      return;
    }

    //if attributes match, no need to write name: name.
    const newHero = {
      id: uuid(),
      name,
      ability,
      power,
      author
    };

    dispatch({ type: "ADD_HERO", payload: newHero });

    //CLEAR STATE AKA CLEAR WHAT'S ON THE FORM
    this.setState({
      name: "",
      ability: "",
      power: "",
      author: "",
      //Clear errors
      errors: {}
    });

    //REDIRECT
    this.props.history.push("/");
  };
*/
