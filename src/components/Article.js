import React, { Component } from 'react';
import Comments from './Comments';
import Loading from './Loading';
import * as api from '../api';
import ErrorMessage from './ErrorMessage';
import ArticlesVotes from './ArticlesVotes';
import DeleteArticle from './DeleteArticle';

export default class Article extends Component {
  state = {
    article: {},
    isLoading: true,
    isError: false,
    errorMessage: '',
    isDeleted: false,
  };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .getArticleById(article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        console.dir(err);
        const {
          response: { data },
        } = err;
        console.log(data);
        const {
          response: { status },
        } = err;
        this.setState({
          isError: true,
          isLoading: false,
          errorMessage: `${status} ${data.msg}`,
        });
      });
  }

  showDeletedMessage = () => {
    console.log('here');
    this.setState({ isDeleted: true });
  };

  render() {
    const { article } = this.state;

    if (this.state.isLoading) {
      return <Loading />;
    } else if (this.state.isError) {
      return <ErrorMessage errorMessage={this.state.errorMessage} />;
    } else if (this.state.isDeleted) {
      return <p>Article has Been Deleted</p>;
    } else {
      return (
        <div className={'article-container'}>
          <h2>{article.title}</h2>
          <p>{article.body}</p>
          <p>Author: {article.author}</p>
          {article.author === 'tickle122' ? (
            <DeleteArticle
              article_id={article.article_id}
              showDeletedMessage={this.showDeletedMessage}
            />
          ) : null}
          <div>
            <ArticlesVotes
              article_id={article.article_id}
              voteCount={article.votes}
            />
          </div>
          <p>{article.comment_count} comments </p>
          <Comments article_id={article.article_id} />
        </div>
      );
    }
  }
}
