import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import bookImgFree from '../../assets/image-empty.svg';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { StarRating } from '../star-rating/star-rating';

import './product-card.scss';
import { baseApiUrl } from '../../settings/api';

export const ProductCard = ({
  authors,
  delivery,
  issueYear,
  histories,
  image,
  booking,
  title,
  type,
  rating,
  id,
  view,
  categories,
}) => {
  const checkStatus = () => {
    let btn = null;
    if (booking) {
      btn = (
        <Button btnType='main' disabled={true} fullwidth={true}>
          {`занята до ${moment(booking.dateOrder).format('DD.MM')} `}
        </Button>
      );
    } else if (delivery) {
      btn = (
        <Button btnType='booking' fullwidth={true}>
          Забронирована
        </Button>
      );
    } else {
      btn = (
        <Button btnType='main' fullwidth={true}>
          Забронировать
        </Button>
      );
    }
    return btn;
  };

  const text = title?.length > 35 ? `${title?.slice(0, 30)}...` : title;

  return (
    <Link className={`product-card ${view}`} data-test-id='card' to={`/books/${categories[0]}/${id}`}>
      <div className='product-image'>
        <img src={image ? `${baseApiUrl}${image.url}` : bookImgFree} alt='' />
      </div>
      <div className={view === 'rows' ? 'row-card-wrap' : 'list-card-wrap'}>
        {view === 'rows' && <StarRating score={rating} />}
        <h2>{text}</h2>
        <p className='product-card-published'>{authors.map((author) => author)}</p>
        {view === 'lists' && (
          <div className='list-style-wrap'>
            <StarRating score={rating} />
            <div className='btn-list'>{checkStatus()}</div>
          </div>
        )}
      </div>
      {view === 'rows' && <div className='btn'>{checkStatus()}</div>}
    </Link>
  );
};
