import './App.css';
import Articleslist from './components/ArticlesList';
import Nav from './components/Nav';
import { Router } from '@reach/router';
import TopArticles from './components/TopArticles';
import Article from './components/Article';
import ErrorMessage from './components/ErrorMessage';

function App() {
  return (
    <div className="App">
      <Nav />
      <div className={'main-page'}>
        <Router className={'article-container'} primary={false}>
          <Articleslist path="/" />
          <Articleslist path="/:topic" />
          <Article path="/articles/:article_id" />
          <Article path="/:topic/articles/:article_id" />
          <ErrorMessage default errorMessage="Page not found :(" />
        </Router>
        <TopArticles />
      </div>
    </div>
  );
}

export default App;
