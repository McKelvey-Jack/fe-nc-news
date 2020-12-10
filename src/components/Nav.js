import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';

export default class Nav extends Component {
  state = { topics: [] };

  componentDidMount() {
    api.getTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  render() {
    return (
      <header>
        <nav>
          <Link to="/">
            <button className={'logo'}>LOGO</button>
          </Link>
          {/* <button
            className={'back-button'}
            onClick={() => {
              window.history.back();
            }}
          >
            Back
          </button> */}
          <Link to="users/tickle122">
            <button className={'user-button'}>
              <span>👤</span>
            </button>
          </Link>
          {this.state.topics.map((topic) => {
            return (
              <Link key={topic.slug} to={`articles/${topic.slug}`}>
                <button className={'topic-button'}>{topic.slug}</button>
              </Link>
            );
          })}
        </nav>
      </header>
    );
  }
}
