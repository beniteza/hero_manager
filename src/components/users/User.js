import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

class User extends Component {
  state = {
    showContactInfo: false,
    following: false,
    followers: []
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const { id } = this.props.user;
    const res = await axios.get(`/followers/${id}`);
    const followers = res.data;

    const { logged_user } = this.props;

    let following = false;
    followers.forEach(follower => {
      if (follower.follower_id === logged_user.id) {
        following = true;
      }
    });

    //Update state
    this.setState({
      ...this.state,
      following: following
    });
  }

  onShowClick = e => {
    this.setState({
      ...this.state,
      showContactInfo: !this.state.showContactInfo
    });
  };

  onFollowClick = async (id, e) => {
    await axios.post(`/followers/add/${id}`);

    this.setState({
      ...this.state,
      following: true
    });
  };

  render() {
    const { id, username, password } = this.props.user;
    const { logged_user } = this.props;

    const { showContactInfo, following, followers } = this.state;

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
            hidden={following || id === logged_user.id}
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
