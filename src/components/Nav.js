import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
import DropdownMenu from './DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';

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
              <FontAwesomeIcon icon={faHome} />
            </button>
          </Link>
          <Link to="users/tickle122">
            <button className={'user-button'}>
              <FontAwesomeIcon icon={faUser} />
            </button>
          </Link>
          <DropdownMenu />
        </nav>
      </header>
    );
  }
}
