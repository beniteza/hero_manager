import React, { Component } from "react";

//BrowserRouter is parent comp that stores all the Route comps. Route holds routes. Switch has stuff like NotFound page
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Heroes from "./components/heroes/Heroes";
import Header from "./components/layout/Header";
import AddHero from "./components/heroes/AddHero";
import EditHero from "./components/heroes/EditHero";
import About from "./components/pages/About";
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
