import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import { Thumbs, FreeMode, Navigation, Pagination } from 'swiper';
import bookImgFree from '../../assets/image-empty.svg';
import { Loader } from '../../components/loader/loader';
import { Button } from '../../components/button/button';
import { StarRating } from '../../components/star-rating/star-rating';
import { screens, useMediaQuery } from '../../hooks/use-media-query';
import { CommentCard } from './comment-card/comment-card';
import { Icon } from '../../components/icon/icon';
import { useGetBookByIdQuery } from '../../store/api/book-api';
import { baseApiUrl } from '../../settings/api';
import { Alert } from '../../components/alert/alert';

import './book-page.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

export const BookPage = () => {
  const isTablet = useMediaQuery(screens.tablet);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [showComments, setShowComments] = useState(true);
  const { id, type } = useParams();
  const { data, error, isLoading } = useGetBookByIdQuery(id);

  const { categoriesList, activeCategory } = useSelector((state) => state.books);

  const findedCategory =
    activeCategory === 'all' ? 'Все книги' : categoriesList.find((category) => category.path === type).name;

  const toggleShowComments = () => {
    setShowComments((prev) => !prev);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className='book-page'>
      {error ? (
        <>
          <Alert />
          <nav>
            <div className='container'>
              <span className='nav-links'>
                <Link data-test-id='breadcrumbs-link' to={`/books/${activeCategory}`}>
                  {findedCategory}
                </Link>
                {findedCategory} / <span data-test-id='book-name'>{data?.title}</span>
              </span>
            </div>
          </nav>
        </>
      ) : (
        <nav>
          <div className='container'>
            <span className='nav-links'>
              <Link data-test-id='breadcrumbs-link' to={`/books/${activeCategory}`}>
                {findedCategory}
              </Link>
              / <span data-test-id='book-name'>{data?.title}</span>
            </span>
          </div>
        </nav>
      )}
      {!error && (
        <div className='container'>
          <div className='book-page-main'>
            <div className='book-page-slider'>
              {data?.images.length > 0 ? (
                <>
                  <Swiper
                    thumbs={{ swiper: thumbsSwiper }}
                    slidesPerView='1'
                    pagination={isTablet ? { clickable: true } : false}
                    loop={true}
                    data-test-id='slide-big'
                    modules={[Thumbs, FreeMode, Pagination]}
                    spaceBetween={20}
                  >
                    {data.images.map(({ url }) => (
                      <SwiperSlide className='slide-top'>
                        <img src={`${baseApiUrl}${url}`} alt='' />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {data.images.length > 1 && !isTablet && (
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      navigation={true}
                      slidesPerView={6}
                      loop={true}
                      modules={[Thumbs, Navigation]}
                      spaceBetween={30}
                    >
                      {data?.images.map(({ url }) => (
                        <SwiperSlide data-test-id='slide-mini' className='slide'>
                          <img src={`${baseApiUrl}${url}`} alt='' />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </>
              ) : (
                <img src={bookImgFree} alt='' />
              )}
            </div>
            <div className='book-page-info'>
              <h3 data-test-id='book-title'>{data?.title}</h3>
              <span>{data?.authors.map((author) => author)}</span>
              <div className='btn'>
                <Button fullwidth={true} btnType='main'>
                  Забронировать
                </Button>
              </div>
              {!isTablet && (
                <div className='book-page-info-about'>
                  <h5>О книге</h5>
                  <p>{data?.description}</p>
                </div>
              )}
            </div>
          </div>
          {isTablet && (
            <div className='book-page-info-about'>
              <h5>О книге</h5>
              <div dangerouslySetInnerHTML={{ __html: data?.about }} />
            </div>
          )}
          <div className='book-page-score'>
            <div className='book-page-info-section'>
              <h5>Рейтинг</h5>
              <hr />
            </div>
            <div className='book-page-score-block'>
              <StarRating score={data?.rating} />
              <h5>{data?.rating}</h5>
            </div>
            <div className='book-page-more-info'>
              <div className='book-page-info-section'>
                <h5>Подробная информация</h5>
                <hr />
              </div>
              <div className='more-info-block-wrapper'>
                <div className='more-info-block-section'>
                  <div className='more-info-block'>
                    <p>Издательство</p>
                    <span>{data?.publish}</span>
                  </div>
                  <div className='more-info-block'>
                    <p>Год издания</p>
                    <span>{data?.issueYear}</span>
                  </div>

                  <div className='more-info-block'>
                    <p>Страниц</p>
                    <span>{data?.pages}</span>
                  </div>
                  <div className='more-info-block'>
                    <p>Переплёт</p>
                    <span>{data?.cover}</span>
                  </div>

                  <div className='more-info-block'>
                    <p>Формат</p>
                    <span>{data?.format}</span>
                  </div>
                </div>
                <div className='more-info-block-section'>
                  <div className='more-info-block'>
                    <p>Жанр</p>
                    <span>{data?.categories[0]}</span>
                  </div>
                  <div className='more-info-block'>
                    <p>Вес</p>
                    <span>{data?.weight} г</span>
                  </div>

                  <div className='more-info-block'>
                    <p>ISBN</p>
                    <span>{data?.ISBN}</span>
                  </div>
                  <div className='more-info-block'>
                    <p>Изготовитель</p>
                    <span>{data?.producer}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='book-page-comments'>
              <div className='book-page-info-section'>
                <button
                  data-test-id='button-hide-reviews'
                  onClick={toggleShowComments}
                  className={classNames('', {
                    active: showComments,
                  })}
                  type='button'
                >
                  Отзывы <span>{data?.comments?.length}</span>
                  <Icon name='angleDown' />
                </button>
                <hr />
              </div>
              {showComments && (
                <div>
                  {data?.comments &&
                    data.comments.map((comment) => (
                      <CommentCard
                        avatar={comment.user.avatarUrl}
                        name={`${comment.user.firstName} ${comment.user.lastName}`}
                        date={comment.createdAt}
                        text={comment.text}
                        rating={comment.rating}
                      />
                    ))}
                </div>
              )}
              <div data-test-id='button-rating' className='book-page-button'>
                <Button btnType='main'>оценить книгу</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
