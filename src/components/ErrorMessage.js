import React from 'react';

export default function ErrorMessage(props) {
  return (
    <div>
      <p>{props.errorMessage}</p>
    </div>
  );
}
