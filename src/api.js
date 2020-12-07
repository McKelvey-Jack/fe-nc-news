import axios from 'axios';

export const getTopics = () => {
  return axios
    .get('https://jackmck-nc-news.herokuapp.com/api/topics')
    .then(({ data }) => {
      return data.topics;
    });
};

export const getArticles = (topic, sort_by, order) => {
  return axios
    .get('https://jackmck-nc-news.herokuapp.com/api/articles', {
      params: {
        topic,
        sort_by: sort_by,
        order: order,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getTopArticles = () => {
  return axios
    .get('https://jackmck-nc-news.herokuapp.com/api/articles', {
      params: {
        sort_by: 'votes',
        order: 'asc',
      },
    })
    .then(({ data }) => {
      const TopArticles = [];
      for (let i = 0; i < 5; i++) {
        TopArticles.push(data.articles[i]);
      }
      return TopArticles;
    });
};
