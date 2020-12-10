import React from 'react';
import * as api from '../api';

export default function DeleteComment(props) {
  const handleDelete = () => {
    props.removeComment(props.comment_id);
    api.deleteComment(props.comment_id);
  };

  return (
    <button
      className={'delete-button'}
      onClick={() => {
        handleDelete();
      }}
    >
      🗑️
    </button>
  );
}
