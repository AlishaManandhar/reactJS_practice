import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css"
import Posts from "./Posts";



class App extends Component {
  render() {
    return (
      <div className="container">
        <Posts />
      </div>
    );
  }
}

export default App;
