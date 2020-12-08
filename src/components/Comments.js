import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';

export default class Comments extends Component {
  state = { comments: [], isLoading: true };

  componentDidMount() {
    api.getArticleComments(this.props.article_id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  }

  incrementVoteCount = (id, index) => {
    this.setState((currstate) => {
      const newState = { ...currstate };
      newState.comments[index].votes++;
      return newState;
    });
    api.changeVoteCount(id, 1);
  };

  decrementVoteCount = (id, index) => {
    this.setState((currstate) => {
      const newState = { ...currstate };
      newState.comments[index].votes--;
      return newState;
    });
    api.changeVoteCount(id, -1);
  };

  render() {
    const { comments } = this.state;
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return comments.map((comment, index) => {
        return (
          <div className={'comments-container'} key={comment.comment_id}>
            <p>{comment.author} 💬</p>
            <p>{comment.body}</p>
            <p>
              <button
                onClick={() => {
                  this.incrementVoteCount(comment.comment_id, index);
                }}
              >
                Up-Vote
              </button>
              {comment.votes}
              <button
                onClick={() => {
                  this.decrementVoteCount(comment.comment_id, index);
                }}
              >
                down-Vote
              </button>
            </p>
          </div>
        );
      });
    }
  }
}
