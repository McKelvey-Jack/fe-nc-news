import React, { Component } from 'react';
import * as api from '../api';

export default class CommentVotes extends Component {
  state = { voteCount: 0, change: 0 };

  componentDidMount() {
    this.setState({ voteCount: +[this.props.voteCount] });
  }

  incrementVoteCount() {
    const id = this.props.comment_id;
    this.setState((currState) => {
      const updatedState = { ...currState };
      updatedState.change++;
      return updatedState;
    });
    api.changeCommentVoteCount(id, 1).catch((err) => {
      this.setState((currState) => {
        const updatedState = { ...currState };
        updatedState.change--;
        return updatedState;
      });
    });
  }

  decrementVoteCount() {
    const id = this.props.comment_id;
    this.setState((currState) => {
      const updatedState = { ...currState };
      updatedState.change--;
      return updatedState;
    });
    api.changeCommentVoteCount(id, -1).catch((err) => {
      this.setState((currState) => {
        const updatedState = { ...currState };
        updatedState.change++;
        return updatedState;
      });
    });
  }

  render() {
    const { voteCount, change } = this.state;
    return (
      <div>
        <button
          onClick={() => {
            this.incrementVoteCount();
          }}
        >
          👍
        </button>
        <p>{voteCount + change}</p>
        <button
          onClick={() => {
            this.decrementVoteCount();
          }}
        >
          👎
        </button>
      </div>
    );
  }
}
