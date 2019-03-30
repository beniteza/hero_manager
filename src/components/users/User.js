import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

class User extends Component {
  state = {
    showContactInfo: false,
    following: false
  };

  async componentDidMount() {
    //Get if the current logged in user is following this user
    /*
      - Route/Request that checks if logged-in user follows the user
      - Returns true/false
    */

    //Update state
    this.setState({
      ...this.state,
      following: false
    });
  }

  onShowClick = e => {
    this.setState({
      ...this.state,
      showContactInfo: !this.state.showContactInfo
    });
  };

  onFollowClick = async (id, e) => {
    const res = await axios.post(`/followers/add/${id}`);

    this.setState({
      ...this.state,
      following: true
    });
  };

  render() {
    const { id, username, password } = this.props.user;
    const { showContactInfo, following } = this.state;

    return (
      <div className="card card-body mb-3">
        <h4>
          {username}{" "}
          <i
            onClick={this.onShowClick}
            className="fas fa-sort-down"
            style={{ cursor: "pointer" }}
          />
          <i
            hidden={following}
            onClick={this.onFollowClick.bind(this, id)}
            className="fas fa-user-plus"
            style={{
              cursor: "pointer",
              float: "right",
              color: "blue",
              marginRight: "1rem"
            }}
          />
          {/* <Link to={`user/heroes/${id}`}> */}
          <Link
            to={{
              pathname: `user/heroes/${id}`,
              state: { username }
            }}
          >
            <i
              hidden={!following}
              className="fas fa-expand-arrows-alt"
              style={{
                cursor: "pointer",
                float: "right",
                color: "blue",
                marginRight: "1rem"
              }}
            />
          </Link>
        </h4>
        {showContactInfo ? (
          <ul className="list-group">
            <li className="list-group-item">Password: {password}</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;
