import React from 'react';

import moment from 'moment';

import { StarRating } from '../../../components/star-rating/star-rating';
import userCommentImage from '../../../assets/comment-avatar.png';
import styles from './comment-card.module.scss';
import { baseApiUrl } from '../../../settings/api';

export const CommentCard = ({ avatar, name, date, rating, text }) => (
  <div className={styles.root}>
    <div className={styles.commentTop}>
      <img src={avatar ? `${baseApiUrl} ${avatar}` : userCommentImage} alt='' />
      <span>{name}</span>
      <time>{moment(date).format('LL')}</time>
    </div>
    <StarRating score={rating} />
    <p>{text}</p>
  </div>
);
