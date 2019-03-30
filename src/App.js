import React, { Component } from "react";

//BrowserRouter is parent comp that stores all the Route comps. Route holds routes. Switch has stuff like NotFound page
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Heroes from "./components/heroes/Heroes";
import UserHeroes from "./components/heroes/UserHeroes";
import Users from "./components/users/Users";
import Header from "./components/layout/Header";
import AddHero from "./components/heroes/AddHero";
import EditHero from "./components/heroes/EditHero";
import About from "./components/pages/About";
import Login from "./components/user_access/Login";
import Logout from "./components/user_access/Logout";
import Register from "./components/user_access/Register";
import NotFound from "./components/pages/NotFound";

import PrivateRoute from "./components/user_access/PrivateRoute";
import PublicOnlyRoute from "./components/user_access/PublicOnlyRoute";

import { Provider } from "./context";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Hero Manager" />
            <div className="container">
              {/* All the routes go inside this container & comps are displayed when their route is taken */}
              <Switch>
                {/* exact = matches the exact path */}
                <Route exact path="/" component={Heroes} />
                <PrivateRoute exact path="/hero/add" component={AddHero} />
                {/* <PrivateRoute
                  exact
                  path="/hero/edit/:id"
                  component={EditHero}
                /> */}
                <PrivateRoute
                  exact
                  path="/user/heroes/:id"
                  component={UserHeroes}
                />
                <Route exact path="/about" component={About} />
                <PublicOnlyRoute exact path="/login" component={Login} />
                <PrivateRoute exact path="/logout" component={Logout} />
                <PublicOnlyRoute exact path="/register" component={Register} />
                <PrivateRoute exact path="/users" component={Users} />
                {/* Not Found Route */}
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

/*
<Route exact path="/" component={Heroes} />
<Route exact path="/hero/add" component={AddHero} />
<Route exact path="/hero/edit/:id" component={EditHero} />
<Route exact path="/about" component={About} />
<Route exact path="/login" component={Login} />
<Route exact path="/logout" component={Logout} />
<Route exact path="/register" component={Register} />
<Route exact path="/users" component={Users} />
<PrivateRoute exact path="/users" component={Users} />
<Route component={NotFound} />
*/
