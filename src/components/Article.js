import React, { Component } from 'react';
import Comments from './Comments';
import Loading from './Loading';
import * as api from '../api';

export default class Article extends Component {
  state = { article: {}, isLoading: true };

  componentDidMount() {
    const { article_id } = this.props;
    api.getArticleById(article_id).then((article) => {
      console.log(article);
      this.setState({ article, isLoading: false });
    });
  }
  render() {
    const { article } = this.state;
    console.log(this.state);
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return (
        <div className={'article-container'}>
          <p>{article.body}</p>
          <p>Author: {article.author}</p>
          <p>Votes: {article.votes}</p>
          <p>{article.comment_count} comments </p>
          <Comments article_id={article.article_id} />
        </div>
      );
    }
  }
}
