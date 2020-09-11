import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import AddQuestion from "./components/add_question";
import QuestionsList from "./components/list_questions";

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Admit Kard Assignment</h2>
          </div>
        </div>
        <div
          style={{
            display: "inline-block",
            width: "100%",
          }}
        >
          <div style={{ float: "left" }}>
            <AddQuestion />
          </div>
          <div style={{ float: "right", marginRight: "100px" }}>
            <QuestionsList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
