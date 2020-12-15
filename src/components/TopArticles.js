import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';
import { dateFormatter } from '../utils';
import { Link } from '@reach/router';

export default class TopArticles extends Component {
  state = { topArticles: [], isLoading: true, isError: false };
  componentDidMount() {
    api
      .getTopArticles()
      .then((topArticles) => {
        this.setState({ topArticles, isLoading: false });
      })
      .catch((err) => {
        this.setState({ isError: true });
      });
  }
  render() {
    const date = dateFormatter(new Date());
    if (this.state.isLoading) {
      return <Loading />;
    } else if (this.state.isError) {
      <p>currently unable to load Top Articles</p>;
    } else {
      return (
        <div className={'top-articles'}>
          <h2> {date}</h2>
          <h3>Most Popular Articles</h3>
          {this.state.topArticles.map((article) => {
            return (
              <div className={'top-article-item'} key={article.article_id}>
                <Link
                  className={'article-title-link'}
                  to={`${article.article_id}`}
                >
                  <h4 className={'top-article-title'}>{article.title}</h4>
                </Link>
                <p>{article.votes} Votes</p>
              </div>
            );
          })}
        </div>
      );
    }
  }
}
