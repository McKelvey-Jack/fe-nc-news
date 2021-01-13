import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
// import DropdownMenu from './DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faAngleDoubleUp,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

export default class Nav extends Component {
  state = { topics: [], showMenu: false };

  componentDidMount() {
    api.getTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  showMenu() {
    this.setState((currState) => {
      let newState = null;
      if (currState.showMenu === false) {
        newState = true;
      } else {
        newState = false;
      }
      return { showMenu: newState };
    });
  }

  hideMenu() {
    this.setState({ showMenu: false });
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
          <button
            className={'menu-button'}
            onClick={() => {
              this.showMenu();
            }}
          >
            {!this.state.showMenu ? (
              <FontAwesomeIcon icon={faBars} />
            ) : (
              <FontAwesomeIcon icon={faAngleDoubleUp} />
            )}
          </button>
        </nav>
        <div className={'menu'}>
          {this.state.showMenu ? (
            <div className={'menu-container'}>
              {this.state.topics.map((topic) => {
                return (
                  <div className={'drop-down-content'}>
                    <Link
                      onClick={() => {
                        this.hideMenu();
                      }}
                      key={topic.slug}
                      to={`articles/${topic.slug}`}
                    >
                      <button className={'topic-button'}>{topic.slug}</button>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </header>
    );
  }
}
