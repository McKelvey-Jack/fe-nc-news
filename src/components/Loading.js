import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <div className={'loadig'}>
      <ReactLoading type={'spin'} color={'Black'} />
    </div>
  );
}
