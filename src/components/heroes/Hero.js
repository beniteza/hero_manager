import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import axios from "axios";

import { Consumer } from "../../context";

class Hero extends Component {
  state = {
    showContactInfo: false
  };

  //Turning this into an arrow func allows it to use 'this' w/o having to bind it
  onShowClick = e => {
    //state is immutable, so use this
    this.setState({
      showContactInfo: !this.state.showContactInfo //toggle it
    });
  };

  //on arrows functs we put async before params
  onDeleteClick = async (id, dispatch) => {
    //DELETE REQUEST
    //No need to put this into a var since we won't be using the response
    await axios.delete(`http://localhost:5000/hero/${id}`);
    //the action is an obj w/ type & a payload w/ the data
    dispatch({ type: "DELETE_HERO", payload: id });
  };

  render() {
    //props contains the hero object that was passed in by the Heroes comp
    const { id, name, ability, power, author } = this.props.hero;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          //value has heroes & dispatch
          return (
            <div className="card card-body mb-3">
              <h4>
                {/* Fire off event when the sort-down arrow is clicked */}
                {name}{" "}
                <i
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                  style={{ cursor: "pointer" /*Makes the click ptr appear*/ }}
                />
                {/* Delete button */}
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  // pass this to the delete func. payload is id and also pass dispatch. you got dispatch from destruct the value
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`hero/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  />
                </Link>
              </h4>
              {/* If showContactInfo = true then show the info */}
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Ability: {ability}</li>
                  <li className="list-group-item">Power: {power}</li>
                  <li className="list-group-item">Author: {author}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Hero.propTypes = {
  hero: PropTypes.object.isRequired
};

export default Hero;
