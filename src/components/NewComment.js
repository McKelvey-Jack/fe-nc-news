import React, { Component } from 'react';
import * as api from '../api';
import ErrorMessage from './ErrorMessage';

export default class NewComment extends Component {
  state = { comment: '', isError: false, errorMessage: '' };

  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state.comment);
    const commentData = { username: 'tickle122', body: this.state.comment };
    api
      .postNewComment(this.props.article_id, commentData)
      .then((newComment) => {
        this.props.addComment(newComment);
        this.setState({ comment: '' });
      })
      .catch((err) => {
        const {
          response: { data },
        } = err;
        const {
          response: { status },
        } = err;
        this.setState({
          isError: true,
          isLoading: false,
          errorMessage: `${status} ${data.msg}`,
        });
      });
  };

  render() {
    if (this.state.isError) {
      return <ErrorMessage errorMessage={this.state.errorMessage} />;
    }
    return (
      <form className={'new-comment-form'} onSubmit={this.handleSubmit}>
        <label>Comment as tickle122</label>
        <textarea
          className={'comment-input'}
          name="comment"
          required={true}
          placeholder="Type your comment here"
          onChange={(event) => {
            this.handleChange(event);
          }}
          value={this.state.comment}
        ></textarea>

        <button type="submit">Post Comment</button>
      </form>
    );
  }
}
