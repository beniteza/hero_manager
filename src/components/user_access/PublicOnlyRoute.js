import React from "react";
import { Consumer } from "../../context";
// import Context from "../../context";
import { Route, Redirect } from "react-router-dom";

const PublicOnlyRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <Consumer>
          {value => {
            const { isLoggedIn } = value;
            console.log(isLoggedIn);
            return isLoggedIn === false ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            );
          }}
        </Consumer>
      );
    }}
  />
);

export default PublicOnlyRoute;
