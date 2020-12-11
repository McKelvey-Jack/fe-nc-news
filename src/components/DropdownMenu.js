import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

export default class DropdownMenu extends Component {
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
      <div className={'menu'}>
        <button
          className={'menu-button'}
          onClick={() => {
            this.showMenu();
          }}
        >
          {!this.state.showMenu ? <span>📗🔽</span> : <span>📗⬆️ </span>}
        </button>
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
            })}{' '}
          </div>
        ) : null}
      </div>
    );
  }
}
