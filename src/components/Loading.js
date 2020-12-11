import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <div className={'loading'}>
      <ReactLoading type={'spin'} color={'black'} />
    </div>
  );
}
