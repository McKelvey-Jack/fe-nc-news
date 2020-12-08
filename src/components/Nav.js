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
            <button>LOGO</button>
          </Link>
          {this.state.topics.map((topic) => {
            return (
              <Link key={topic.slug} to={topic.slug}>
                {topic.slug}
              </Link>
            );
          })}
        </nav>
      </header>
    );
  }
}
