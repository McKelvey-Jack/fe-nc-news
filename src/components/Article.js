import React, { Component } from 'react';
import Comments from './Comments';
import Loading from './Loading';
import * as api from '../api';
import ErrorMessage from './ErrorMessage';
import ArticlesVotes from './ArticlesVotes';
import DeleteArticle from './DeleteArticle';
import { Link } from '@reach/router';
import { dateFormatter } from '../utils';

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
        const {
          response: { data },
        } = err;
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
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.article_id !== this.props.article_id) {
      const { article_id } = this.props;
      api
        .getArticleById(article_id)
        .then((article) => {
          this.setState({ article, isLoading: false });
        })
        .catch((err) => {
          const {
            response: { data },
          } = err;
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
  }

  showDeletedMessage = () => {
    this.setState({ isDeleted: true });
  };

  render() {
    const { article } = this.state;
    const date = dateFormatter(article.created_at);

    if (this.state.isLoading) {
      return <Loading />;
    } else if (this.state.isError) {
      return <ErrorMessage errorMessage={this.state.errorMessage} />;
    } else if (this.state.isDeleted) {
      return (
        <div>
          <p>Article has Been Deleted</p>
          <Link to="/">
            <button className={'after-delete-return-button'}>
              Back To All Articles
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className={'article-container'}>
          <p className={'article-date'}> {date}</p>
          <h2 className={'article-title'}>{article.title}</h2>
          <p className={'article-body'}>{article.body}</p>
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

          <Comments article_id={article.article_id} />
        </div>
      );
    }
  }
}
