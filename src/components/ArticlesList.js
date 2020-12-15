import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';
import Loading from './Loading';
import ArticlesVotes from './ArticlesVotes';
import { dateFormatter } from '../utils';
import ErrorMessage from './ErrorMessage';

export default class Articleslist extends Component {
  state = {
    articles: [],
    timeOrder: null,
    voteCountOrder: null,
    isLoading: true,
    isError: false,
    errorMessage: '',
  };

  componentDidMount() {
    api
      .getArticles(this.props.user)
      .then((articles) => {
        this.setState({
          articles,
          isLoading: false,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      api
        .getArticles(this.props.topic)
        .then((articles) => {
          this.setState({ articles });
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

  sortArticlesByTime(order) {
    api.getArticles(this.props.topic, 'created_at', order).then((articles) => {
      this.setState({ articles, timeOrder: order });
    });
  }

  sortArticlesByVotes(order) {
    api.getArticles(this.props.topic, 'votes', order).then((articles) => {
      this.setState({ articles, voteOrder: order });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else if (this.state.isError) {
      return <ErrorMessage errorMessage={this.state.errorMessage} />;
    } else {
      return (
        <section className={'articles-list'}>
          {!this.props.topic ? (
            <h1>All Articles</h1>
          ) : (
            <h1>{this.props.topic} Articles</h1>
          )}
          {this.props.topic ? (
            <Link to={`/articles/${this.props.topic}/newArticle`}>
              <button className={'post-article-button'}>
                Post an article about {this.props.topic}
              </button>
            </Link>
          ) : null}

          <div className={'sort-buttons-container'}>
            <button
              className={'sort-button'}
              onClick={() => {
                this.sortArticlesByTime('asc');
              }}
            >
              Oldest
            </button>
            <button
              className={'sort-button'}
              onClick={() => {
                this.sortArticlesByTime('desc');
              }}
            >
              Newest
            </button>
            <button
              className={'sort-button'}
              onClick={() => {
                this.sortArticlesByVotes('desc');
              }}
            >
              Votes higest
            </button>
            <button
              className={'sort-button'}
              onClick={() => {
                this.sortArticlesByTime('asc');
              }}
            >
              Votes lowest
            </button>
          </div>
          {this.state.articles.map((article, index) => {
            const date = dateFormatter(article.created_at);
            return (
              <div key={article.article_id} className={'article-list-item'}>
                <p className={'article-date'}>{date}</p>
                {
                  <Link
                    className={'article-title-link'}
                    to={`${article.article_id}`}
                  >
                    <h2 className={'article-title'}>{article.title}</h2>
                  </Link>
                }
                <div>
                  <p>{article.body}</p>

                  {!this.props.topic ? <p>Topic: {article.topic}</p> : null}

                  <p>Author: {article.author}</p>

                  <div>
                    <ArticlesVotes
                      article_id={article.article_id}
                      voteCount={article.votes}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      );
    }
  }
}
