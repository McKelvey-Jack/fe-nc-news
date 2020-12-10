import React from 'react';
import * as api from '../api';

export default function DeleteArticle(props) {
  const handleDelete = () => {
    api.deleteArticle(props.article_id).then(() => {
      props.showDeletedMessage();
    });
  };

  return (
    <button
      className={'delete-button'}
      onClick={() => {
        handleDelete();
      }}
    >
      🗑️ Remove this Article
    </button>
  );
}
