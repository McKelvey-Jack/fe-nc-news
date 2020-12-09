import React, { Component } from 'react';
import * as api from '../api';

export default class NewComment extends Component {
  state = { comment: '' };

  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const commentData = { username: 'tickle122', body: this.state.comment };
    api
      .postNewComment(this.props.article_id, commentData)
      .then((newComment) => {
        this.props.addComment(newComment);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Comment as tickle122</label>
        <input
          type="text"
          name="comment"
          required={true}
          placeholder="Type your comment here"
          onChange={(event) => {
            this.handleChange(event);
          }}
          value={this.state.comment}
        ></input>
        <button type="submit">Post Comment</button>
      </form>
    );
  }
}
