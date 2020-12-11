import React from 'react';
import { Link } from '@reach/router';

export default function ErrorMessage(props) {
  return (
    <div>
      <p>{props.errorMessage}</p>
      <Link to="/">
        <button className={'after-error-return-button'}>
          Back to All Articles
        </button>
      </Link>
    </div>
  );
}
