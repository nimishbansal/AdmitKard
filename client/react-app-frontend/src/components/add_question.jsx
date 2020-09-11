import React, { Component } from "react";
import Dropdown from "react-dropdown";
import { Dropdown as SemanticUIDropDown } from "semantic-ui-react";

import "react-dropdown/style.css";
import "./add_question.css";

var constants = require("../constants");

// These are predefined topics which a question can have.
const TopicsEnum = ["top-colleges", "qualifying-criteria"];

// These are predefined tags which a question can have.
const TagsEnum = [
  {
    key: "stanford-university",
    text: "stanford-university",
    value: "stanford-university",
  },
  { key: "usa", text: "usa", value: "usa" },
  { key: "admission", text: "admission", value: "admission" },
  { key: "engineering", text: "engineering", value: "engineering" },
  { key: "top", text: "top", value: "top" },
];

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: undefined,
      tags: [],
      query: "",
      errors: [],
      success_msg: "",
    };
  }

  async createQuestion(body) {
    // Handles the API Request to create Question
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch(constants.BASE_BACKEND_URL + "/question/", requestOptions)
      .then(async (response) => {
        // console.log(response.status);
        let result = await response.json();
        console.log(result);
        if (response.status === 200) {
          this.setState({
            success_msg: "Question Added Successfully. Please Wait....",
            errors: [],
            tags: [],
            query: "",
            topic: undefined,
          });
          await new Promise((resolve) => setTimeout(resolve, 1000));
          window.location.reload();
        } else if (response.status === 400) {
          this.setState({ errors: [result.message] });
        }
      })
      .catch((err) => {
        console.log("some error occ");
      });
  }

  _queryInputChangeHandler = (event) => {
    this.setState({ query: event.target.value });
  };

  _onTopicChangeHandler = (event) => {
    this.setState({ topic: event.value });
  };

  _onTagsChangeHandler = (event, data) => {
    this.setState({ tags: data.value });
  };

  _submitForm = async (event) => {
    event.preventDefault();
    let errors = [];
    this.setState({ errors: [], success_msg: "" });
    //validating topic
    if (this.state.topic === undefined) {
      errors.push("Please Select a topic");
    }
    //validating tags
    if (this.state.tags.length < 1) {
      errors.push("Please select atleast one tag");
    }

    if (errors.length > 0) {
      this.setState({ errors: errors });
      return;
    }
    this.createQuestion(this.state);
  };

  render() {
    const { errors } = this.state;
    const { success_msg } = this.state;
    return (
      <div className="question-form">
        <h2>Add Question</h2>
        <form onSubmit={this._submitForm}>
          {/* Errors */}
          <div className="error-msg">
            {errors.map((error) => (
              <p key={error}>Error: {error}</p>
            ))}
          </div>

          {/* Successful Message */}
          <div className="success-msg">{success_msg}</div>
          <br />

          {/* Query */}
          <p>Enter query : </p>
          <input
            className="query-input"
            type="text"
            onChange={this._queryInputChangeHandler}
            value={this.state.query}
            required
          />
          <br />
          <br />
          {/* Topic Selection */}
          <p>Select Topic : </p>
          <Dropdown
            className="topic-select"
            options={TopicsEnum}
            onChange={this._onTopicChangeHandler}
            value={this.state.topic}
            placeholder="Select topic"
            required
          />
          <br />

          {/* Tags Selection */}
          <p>Select Tags : </p>
          <SemanticUIDropDown
            className="tag-select"
            placeholder="Tags"
            multiple
            selection
            options={TagsEnum}
            value={this.state.tags}
            onChange={this._onTagsChangeHandler}
          />
          <br />
          <br />
          <br />
          {/* Submit */}
          <input type="submit" className="btn btn-info submit" />
        </form>
      </div>
    );
  }
}

export default AddQuestion;
