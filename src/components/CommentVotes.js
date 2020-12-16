import React, { Component } from 'react';
import * as api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

export default class CommentVotes extends Component {
  state = { voteCount: 0, change: 0, hasVotedUp: false, hasVotedDown: false };

  componentDidMount() {
    this.setState({ voteCount: +[this.props.voteCount] });
  }

  incrementVoteCount() {
    const id = this.props.comment_id;
    this.setState((currState) => {
      const updatedState = { ...currState };
      updatedState.change++;
      updatedState.hasVotedUp = true;
      updatedState.hasVotedDown = false;
      return updatedState;
    });
    api.changeCommentVoteCount(id, 1).catch((err) => {
      this.setState((currState) => {
        const updatedState = { ...currState };
        updatedState.change--;
        updatedState.hasVotedUp = false;
        updatedState.hasVotedDown = false;

        return updatedState;
      });
    });
  }

  decrementVoteCount() {
    const id = this.props.comment_id;
    this.setState((currState) => {
      const updatedState = { ...currState };
      updatedState.change--;
      updatedState.hasVotedDown = true;
      updatedState.hasVotedUp = false;
      return updatedState;
    });
    api.changeCommentVoteCount(id, -1).catch((err) => {
      this.setState((currState) => {
        const updatedState = { ...currState };
        updatedState.change++;
        updatedState.hasVotedDown = false;
        updatedState.hasVotedUp = false;
        return updatedState;
      });
    });
  }

  render() {
    const { voteCount, change } = this.state;
    return (
      <div className={'votes'}>
        <button
          disabled={this.state.hasVotedUp ? true : false}
          onClick={() => {
            this.incrementVoteCount();
          }}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        <p>{voteCount + change}</p>
        <button
          disabled={this.state.hasVotedDown ? true : false}
          onClick={() => {
            this.decrementVoteCount();
          }}
        >
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
      </div>
    );
  }
}
