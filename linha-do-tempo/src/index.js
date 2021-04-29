import React, { Component } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import ProgressReportVertical from "./components/progressReportVertical";


import Spinner from "./components/spinner";
import Card from "./components/card";

import "react-vertical-timeline-component/style.min.css";

import "./styles.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      renderReport: false,
    };
  }

  

  render() {
    let spinner;

    setTimeout(
      function() {
        this.setState({ renderReport: true });
      }.bind(this),
      2000
    );

    if (this.state.renderReport) 
      spinner = <Card />;
    else 
      spinner = <Spinner />;
    
    return (
      <div className="App">
        
        <Switch>
          <Route exact path="/" component={ProgressReportVertical} />
          <Route path="/about" component={() => spinner} />
        </Switch>
      </div>
    );
    
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);
