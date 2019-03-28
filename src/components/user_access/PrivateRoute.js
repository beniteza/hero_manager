import React from "react";
import { Consumer } from "../../context";
// import Context from "../../context";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <Consumer>
          {value => {
            const { isLoggedIn } = value;
            return isLoggedIn ? (
              <Component {...props} />
            ) : (
              <Redirect to="/login" />
            );
          }}
        </Consumer>
      );
    }}
  />
);

export default PrivateRoute;

/*
const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

*/
