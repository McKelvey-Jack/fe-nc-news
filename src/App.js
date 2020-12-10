import React from 'react';
import './App.css';
import Articleslist from './components/ArticlesList';
import Nav from './components/Nav';
import { Router } from '@reach/router';
import TopArticles from './components/TopArticles';
import Article from './components/Article';
import ErrorMessage from './components/ErrorMessage';
import AddArticle from './components/AddArticle';
import UserHomePage from './components/UserHomePage';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className={'main-page'}>
          <Router className={'article-router'} primary={false}>
            <UserHomePage path="users/:username" />
            <Articleslist path="/" />
            <Articleslist path="/articles/:topic" />
            <Article path=":article_id" />
            <Article path="/articles/:topic/:article_id" />
            <Article path="/users/:username/articles/:article_id" />
            <AddArticle path="/articles/:topic/newArticle" />
            <ErrorMessage default errorMessage="Page not found :(" />
          </Router>
          <TopArticles />
        </div>
      </div>
    );
  }
}

export default App;
