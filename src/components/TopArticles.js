import React, { Component } from 'react';
import * as api from '../api';

export default class TopArticles extends Component {
  state = { topArticles: [] };
  componentDidMount() {
    api.getTopArticles().then((topArticles) => {
      this.setState({ topArticles });
    });
  }
  render() {
    return (
      <div className={'top-articles'}>
        {this.state.topArticles.map((article) => {
          return (
            <div>
              <h4>{article.title}</h4>
              <p>{article.votes}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
