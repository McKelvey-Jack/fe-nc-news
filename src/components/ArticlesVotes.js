import React, { Component } from 'react';
import * as api from '../api';

export default class ArticlesVotes extends Component {
  state = { voteCount: 0, change: 0, hasVotedUp: false, hasVotedDown: false };

  componentDidMount() {
    this.setState({ voteCount: +[this.props.voteCount] });
  }

  incrementVoteCount() {
    const id = this.props.article_id;
    this.setState((currState) => {
      const updatedState = { ...currState };
      updatedState.change++;
      updatedState.hasVotedUp = true;
      updatedState.hasVotedDown = false;
      return updatedState;
    });
    api.changeArticleVoteCount(id, 1).catch((err) => {
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
    const id = this.props.article_id;
    this.setState((currState) => {
      const updatedState = { ...currState };
      updatedState.change--;
      updatedState.hasVotedDown = true;
      updatedState.hasVotedUp = false;
      return updatedState;
    });
    api.changeArticleVoteCount(id, -1).catch((err) => {
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
          title={'vote'}
          disabled={this.state.hasVotedUp ? true : false}
          onClick={() => {
            this.incrementVoteCount();
          }}
        >
          👍
        </button>
        <p>{voteCount + change}</p>
        <button
          disabled={this.state.hasVotedDown ? true : false}
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
