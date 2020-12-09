import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';

export default class TopArticles extends Component {
  state = { topArticles: [], isLoading: true };
  componentDidMount() {
    api.getTopArticles().then((topArticles) => {
      this.setState({ topArticles, isLoading: false });
    });
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className={'top-articles'}>
          {this.state.topArticles.map((article) => {
            return (
              <div key={article.article_id}>
                <h4>{article.title}</h4>
                <p>{article.votes}</p>
              </div>
            );
          })}
        </div>
      );
    }
  }
}
