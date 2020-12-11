import { Link } from '@reach/router';
import React, { Component } from 'react';
import * as api from '../api';
import Loading from './Loading';
import { dateFormatter } from '../utils';
import ErrorMessage from './ErrorMessage';

export default class UserHomePage extends Component {
  state = {
    user: {},
    username: 'tickle122',
    articles: [],
    isLoading: true,
    isError: false,
    errorMessage: '',
  };

  componentDidMount() {
    const { username } = this.state;
    api
      .getUser(username)
      .then((user) => {
        api
          .getArticlesByUser(username)
          .then((articles) => {
            this.setState({ user, articles, isLoading: false });
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

  render() {
    const { name, username, avatar_url } = this.state.user;
    if (this.state.isLoading) {
      return <Loading />;
    } else if (this.state.isError) {
      return <ErrorMessage errorMessage={this.state.errorMessage} />;
    } else {
      return (
        <section className={'user-page'}>
          <div className={'user-details-container'}>
            <div className={'avatar-container'}>
              <img src={avatar_url} alt="avatar"></img>
            </div>
            <div className={'username-container'}>
              <h2>{name}</h2>
              <h2 className={'username'}>{username}</h2>
            </div>
          </div>

          <h3>Your Article Timeline</h3>
          {this.state.articles.map((article) => {
            const formattedDate = dateFormatter(article.created_at);
            return (
              <div className={'user-article-list-item'} key={article.article_id}>
                <Link
                  className={'article-title-link'}
                  to={`articles/${article.article_id}`}
                >
                  <h4>{article.title}</h4>
                </Link>
                <p>{formattedDate}</p>
              </div>
            );
          })}
        </section>
      );
    }
  }
}
