import React, { Component } from "react";
import { Consumer } from "../../context";

// For Linking
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const { branding } = this.props;
    return (
      <Consumer>
        {value => {
          const { isLoggedIn } = value;
          return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3 py-3">
              <div className="container">
                <a
                  href="/"
                  className="navbar-brand"
                  style={{ fontSize: "25px" }}
                >
                  {branding}
                </a>
                <div className="">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item" style={{ fontSize: "20px" }}>
                      <Link to="/" className="nav-link">
                        Home
                      </Link>
                    </li>

                    {isLoggedIn
                      ? [
                          <li className="nav-item" style={{ fontSize: "20px" }}>
                            <Link to="/hero/add" className="nav-link">
                              Add
                            </Link>
                          </li>,
                          <li className="nav-item" style={{ fontSize: "20px" }}>
                            <Link to="/users" className="nav-link">
                              Users
                            </Link>
                          </li>,
                          <li className="nav-item" style={{ fontSize: "20px" }}>
                            <Link to="/logout" className="nav-link">
                              Logout
                            </Link>
                          </li>
                        ]
                      : [
                          <li className="nav-item" style={{ fontSize: "20px" }}>
                            <Link to="/login" className="nav-link">
                              Login
                            </Link>
                          </li>,
                          <li className="nav-item" style={{ fontSize: "20px" }}>
                            <Link to="/register" className="nav-link">
                              Register
                            </Link>
                          </li>
                        ]}
                    <li className="nav-item" style={{ fontSize: "20px" }}>
                      <Link to="/about" className="nav-link">
                        About
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          );
        }}
      </Consumer>
    );
  }
}

export default Header;

/*
//Funtional Comp
import React from "react";
import PropTypes from "prop-types";

// For Linking
import { Link } from "react-router-dom";

const Header = props => {
  const { branding } = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          {branding}
        </a>
        <div className="">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/hero/add" className="nav-link">
                <i className="fas fa-plus" /> Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                <i className="fas fa-user" /> Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <i className="fas fa-question" /> About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link">
                Logout
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  branding: "My App"
};

//throws console err if given prop is not the type specified
Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;
*/
