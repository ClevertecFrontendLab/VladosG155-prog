import React from 'react';

import { Icon } from '../icon/icon';

import './star-rating.scss';

export const StarRating = ({ score }) => {
  const noScoreInfo = score === null ? 'ещё нет оценок' : '';

  return (
    <div className='stars-wrap'>
      {score === null ? (
        <p>{noScoreInfo}</p>
      ) : (
        [0, 1, 2, 3, 4].map((num, i) =>
          i < score ? (
            <div key={num} className='star'>
              <Icon name='starFilled' />
            </div>
          ) : (
            <div key={num} className='star'>
              <Icon name='star' />
            </div>
          )
        )
      )}
    </div>
  );
};
