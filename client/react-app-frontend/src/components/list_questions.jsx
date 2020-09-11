import React, { Component } from "react";
import ReactJson from "react-json-view";
var constants = require("../constants");
import "./list_questions.css";
class QuestionsList extends Component {
  loadQuestions(search_term) {
    fetch(constants.BASE_BACKEND_URL + "/question/?q=" + search_term)
      .then(async (response) => {
        // console.log(response.status);
        let result = await response.json();
        if (response.status === 200) {
          this.setState({
            questions: result,
            success_message:
              result.length + " results found for the provided search term",
            last_search_term: search_term,
          });
        } else if (response.status === 400) {
          this.setState({ errors: [result.message] });
        }
      })
      .catch((err) => {
        console.log("some error occ");
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      search_term: "",
      errors: [],
      success_message: "",
      last_seach_term: "",
    };
    this.loadQuestions(this.state.search_term);
  }

  _queryInputChangeHandler = (event) => {
    this.setState({ search_term: event.target.value });
  };

  _submitForm = async (event) => {
    event.preventDefault();
    this.loadQuestions(this.state.search_term);
  };

  render() {
    return (
      <div
        style={{
          marginRight: "50%",
          marginTop: "5%",
        }}
      >
        <h3 style={{ float: "left" }}>
          Current search term: &nbsp; {this.state.last_search_term}
        </h3>

        {/* Search Term Input */}
        <form onSubmit={this._submitForm}>
          <input
            type="text"
            onChange={this._queryInputChangeHandler}
            value={this.state.search_term}
          />
          <br />
          <br />
          <input type="submit" className="btn btn-info" />
          <br />
          <br />
        </form>

        {/* Results Count */}
        <div className="success-msg">{this.state.success_message}</div>
        <br />

        {/* Questions list in json form */}
        <h3>Questions List</h3>
        <ReactJson
          src={this.state.questions}
          name={false}
          displayDataTypes={false}
          style={{ width: "200%" }}
        />
      </div>
    );
  }
}

export default QuestionsList;
