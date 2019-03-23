import React, { Component } from "react";

import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";

import axios from "axios";
import qs from "qs";

class EditHero extends Component {
  //these are the fields of the form
  state = {
    name: "",
    ability: "",
    power: "",
    author: "",
    //for validation
    errors: {}
  };

  //Bring existing hero data
  async componentDidMount() {
    //get id from url
    const { id } = this.props.match.params;
    const res = await axios.get(`http://localhost:5000/hero/${id}`);

    //res.data returns a colection of heroes. so since there's only one you gotta res.data[0]
    const hero = res.data[0];

    this.setState({
      name: hero.name,
      ability: hero.ability,
      power: hero.power,
      author: hero.author
    });
  }

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

    //PUT REQUEST
    const editedHero = {
      name,
      ability,
      power,
      author
    };
    const { id } = this.props.match.params;
    const res = await axios.put(
      `http://localhost:5000/hero/${id}`,
      qs.stringify(editedHero)
    );
    //res.data is the edited hero being returned by the backend
    dispatch({ type: "EDIT_HERO", payload: res.data });

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
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    errors={errors.name}
                  />
                  <TextInputGroup
                    label="Ability"
                    name="ability"
                    placeholder="Enter Ability"
                    value={ability}
                    onChange={this.onChange}
                    errors={errors.ability}
                  />
                  <TextInputGroup
                    label="Power"
                    name="power"
                    placeholder="Enter Power"
                    value={power}
                    onChange={this.onChange}
                    errors={errors.power}
                  />
                  <TextInputGroup
                    label="Author"
                    name="author"
                    placeholder="Enter Author"
                    value={author}
                    onChange={this.onChange}
                    errors={errors.author}
                  />
                  <input
                    type="submit"
                    value="Update Hero"
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

export default EditHero;
