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
    .get(`https://jackmck-nc-news.herokuapp.com/api/articles`, {
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
        order: 'desc',
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

export const getArticleById = (id) => {
  return axios
    .get(`https://jackmck-nc-news.herokuapp.com/api/articles/${id}`)
    .then(({ data }) => {
      return data.article;
    });
};

export const getArticleComments = (id) => {
  return axios
    .get(`https://jackmck-nc-news.herokuapp.com/api/articles/${id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
};

export const changeCommentVoteCount = (id, valueToChangeBy) => {
  console.log(id, valueToChangeBy);
  return axios.patch(
    `https://jackmck-nc-news.herokuapp.com/api/comments/${id}`,
    {
      inc_votes: valueToChangeBy,
    }
  );
};

export const changeArticleVoteCount = (id, valueToChangeBy) => {
  return axios.patch(
    `https://jackmck-nc-news.herokuapp.com/api/articles/${id}`,
    {
      inc_votes: valueToChangeBy,
    }
  );
};

export const postNewComment = (id, commentData) => {
  return axios
    .post(
      `https://jackmck-nc-news.herokuapp.com/api/articles/${id}/comments`,
      commentData
    )
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteComment = (id) => {
  return axios.delete(
    `https://jackmck-nc-news.herokuapp.com/api/comments/${id}`
  );
};

export const addArticle = (articleData) => {
  return axios
    .post('https://jackmck-nc-news.herokuapp.com/api/articles', articleData)
    .then(({ data }) => {
      return data.article;
    });
};

export const deleteArticle = (id) => {
  return axios.delete(
    `https://jackmck-nc-news.herokuapp.com/api/articles/${id}`
  );
};
