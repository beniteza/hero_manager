import React, { Component } from "react";

//BrowserRouter is parent comp that stores all the Route comps. Route holds routes. Switch has stuff like NotFound page
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Heroes from "./components/heroes/Heroes";
import Header from "./components/layout/Header";
import AddHero from "./components/heroes/AddHero";
import EditHero from "./components/heroes/EditHero";
import About from "./components/pages/About";
import Login from "./components/user_access/Login";
import Logout from "./components/user_access/Logout";
import Register from "./components/user_access/Register";
import NotFound from "./components/pages/NotFound";

import { Provider } from "./context";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      //Wrap everything in the brought in Provider
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Hero Manager" />
            <div className="container">
              {/* All the routes go inside this container & comps are displayed when their route is taken */}
              <Switch>
                {/* exact = matches the exact path */}
                <Route exact path="/" component={Heroes} />
                <Route exact path="/hero/add" component={AddHero} />
                <Route exact path="/hero/edit/:id" component={EditHero} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/register" component={Register} />
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
