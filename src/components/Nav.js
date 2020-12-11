import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
import DropdownMenu from './DropdownMenu';

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
            <button className={'logo'}>
              <span>🏠</span>
            </button>
          </Link>
          <Link to="users/tickle122">
            <button className={'user-button'}>
              <span>👤</span>
            </button>
          </Link>
          <DropdownMenu />
        </nav>
      </header>
    );
  }
}
