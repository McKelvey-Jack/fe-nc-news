import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

export default class Articleslist extends Component {
  state = { articles: [], timeOrder: null, voteCountOrder: null };

  componentDidMount() {
    api.getArticles().then((articles) => {
      this.setState({ articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      api.getArticles(this.props.topic).then((articles) => {
        this.setState({ articles });
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
    return (
      <section className={'articles-list'}>
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
        {this.state.articles.map((article) => {
          console.log(article.article_id);
          return (
            <div key={article.article_id} className={'article-list-item'}>
              {
                <Link to={`articles/${article.article_id}`}>
                  <h2>{article.title}</h2>
                </Link>
              }
              <div>
                <p>{article.body}</p>
                <p>{article.comment_count} comments </p>
                <p>Topic: {article.topic}</p>
                <p>Author: {article.author}</p>
                <p> created-at: {article.created_at}</p>
                <p>Votes: {article.votes}</p>
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}
