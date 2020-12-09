import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';
import Loading from './Loading';
import ArticlesVotes from './ArticlesVotes';

export default class Articleslist extends Component {
  state = {
    articles: [],
    timeOrder: null,
    voteCountOrder: null,
    isLoading: true,
    isError: false,
  };

  componentDidMount() {
    api
      .getArticles()
      .then((articles) => {
        this.setState({ articles, isLoading: false });
      })
      .catch((err) => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      api
        .getArticles(this.props.topic)
        .then((articles) => {
          this.setState({ articles });
        })
        .catch((err) => {
          console.log('here');
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
    } else {
      return (
        <section className={'articles-list'}>
          <h2>{this.props.topic} Articles</h2>
          <Link to={`/articles/${this.props.topic}/newArticle`}>
            <button>Post an article about {this.props.topic}</button>
          </Link>
          <div>
            <button
              onClick={() => {
                this.sortArticlesByTime('asc');
              }}
            >
              Oldest
            </button>
            <button
              onClick={() => {
                this.sortArticlesByTime('desc');
              }}
            >
              Newest
            </button>
            <button
              onClick={() => {
                this.sortArticlesByVotes('desc');
              }}
            >
              Votes higest
            </button>
            <button
              onClick={() => {
                this.sortArticlesByTime('asc');
              }}
            >
              Votes lowest
            </button>
          </div>
          {this.state.articles.map((article, index) => {
            return (
              <div key={article.article_id} className={'article-list-item'}>
                {
                  <Link to={`${article.article_id}`}>
                    <h2>{article.title}</h2>
                  </Link>
                }
                <div>
                  <p>{article.body}</p>
                  <p>{article.comment_count} comments </p>
                  <p>Topic: {article.topic}</p>
                  <p>Author: {article.author}</p>
                  <p> created-at: {article.created_at}</p>
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
