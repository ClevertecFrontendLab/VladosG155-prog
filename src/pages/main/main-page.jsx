import { Suspense, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Aside } from '../../components/aside/aside';
import { Button } from '../../components/button/button';
import { Icon } from '../../components/icon/icon';
import { Input } from '../../components/input/input';
import { ProductCard } from '../../components/product-card/product-card';
import { screens, useMediaQuery } from '../../hooks/use-media-query';

import styles from './main-page.module.scss';
import { useGetAllBooksQuery, useGetBookCategoriesQuery } from '../../store/api/book-api';
import { Loader } from '../../components/loader/loader';
import { Alert } from '../../components/alert/alert';

export const MainPage = () => {
  const [viewType, setViewType] = useState('rows');

  const [viewButotns, setViewButtons] = useState([
    {
      iconName: 'menu',
      type: 'rows',
      dataType: 'button-menu-view-window',
    },
    {
      iconName: 'burger',
      type: 'lists',
      dataType: 'button-menu-view-list',
    },
  ]);

  const [isShowSearch, setIsShowSearch] = useState(false);

  const isTablet = useMediaQuery(screens.tablet);
  const isMobile = useMediaQuery(screens.mobile);

  const { isFullfiled } = useGetBookCategoriesQuery();

  const { data, error, isLoading } = useGetAllBooksQuery({ skip: isFullfiled });

  const dispatch = useDispatch();

  const books = useSelector((state) => state.product.books);

  const toggleShowSearch = () => {
    setIsShowSearch((prev) => !prev);
  };

  const viewTypeClassName = viewType === 'rows' ? `${styles.booksWrapLists}` : `${styles.booksWrapRows}`;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='container'>
      <section className={styles.root}>
        <Aside />
        {error && <Alert />}
        {!error && (
          <div className={styles.mainPageWrap}>
            <div className={styles.topMenu}>
              <div className={styles.topMenuFirst}>
                {!isMobile ? (
                  <div className={styles.mainPageInput}>
                    <Input iconName='search' iconPosition='left' placeholder='Поиск книги или автора…' />
                  </div>
                ) : (
                  !isShowSearch && (
                    <div className={styles.button} data-test-id='button-search-open'>
                      <Button onClick={toggleShowSearch} rounded={true}>
                        <Icon name='search' />
                      </Button>
                    </div>
                  )
                )}

                <div
                  className={classNames(styles.inputMobile, {
                    [styles.active]: isShowSearch,
                    [styles.hidden]: !isShowSearch,
                  })}
                >
                  <Input
                    iconName='close'
                    data-test-id='input-search'
                    iconAction={toggleShowSearch}
                    iconPosition='right'
                    placeholder='Поиск книги или автора…'
                  />
                </div>

                {!isShowSearch && (
                  <Button rounded={isMobile ? true : false}>
                    <Icon name='dropDown' />
                    {!isMobile && <span style={{ marginLeft: '8px' }}>По рейтингу</span>}
                  </Button>
                )}
              </div>
              {!isShowSearch && (
                <div className={styles.topMenuLast}>
                  {viewButotns.map((button) => (
                    <Button
                      key={button.iconName}
                      rounded={true}
                      className={viewType === button.type ? 'active' : ''}
                      onClick={() => setViewType(button.type)}
                      dataTest={button.dataType}
                    >
                      <Icon name={button.iconName} />
                    </Button>
                  ))}
                </div>
              )}
            </div>

            <div className={viewTypeClassName}>
              {data?.map((book) => (
                <ProductCard
                  key={book.id}
                  id={book.id}
                  authors={book.authors}
                  histories={book.histories}
                  title={book.title}
                  rating={book.rating}
                  booking={book.booking}
                  categories={book.categories}
                  issueYear={book.issueYear}
                  delivery={book.delivery}
                  view={viewType}
                  image={book.image}
                  score={book.score}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
