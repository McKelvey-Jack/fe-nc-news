import React, { Component } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router';

export default class AddArticle extends Component {
  state = { title: '', body: '' };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, body } = this.state;
    const articleData = {
      title: title,
      body: body,
      author: 'tickle122',
      topic: this.props.topic,
    };
    api.addArticle(articleData).then((article) => {
      console.log(article);
      navigate(`/articles/${this.props.topic}/${article.article_id}`);
    });
  };
  render() {
    return (
      <section className={'new-article-section'}>
        <h2>Add a new Article about {this.props.topic}</h2>
        <form className={'new-article-form'} onSubmit={this.handleSubmit}>
          <label>Title: </label>
          <input
            className={'article-form-input'}
            type="text"
            name="title"
            required={true}
            placeholder="Write your article title here"
            onChange={(event) => {
              this.handleChange(event);
            }}
            value={this.state.title}
          ></input>
          <label>body</label>
          <textarea
            className={'article-form-input'}
            type="text"
            name="body"
            required={true}
            placeholder="Write your article title here"
            onChange={(event) => {
              this.handleChange(event);
            }}
            value={this.state.body}
          ></textarea>

          <button type="submit">Post Article</button>
        </form>
      </section>
    );
  }
}
