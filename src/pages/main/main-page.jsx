import { Suspense, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Aside } from '../../components/aside/aside';
import { Button } from '../../components/button/button';
import { Icon } from '../../components/icon/icon';
import { Input } from '../../components/input/input';
import { ProductCard } from '../../components/product-card/product-card';
import { screens, useMediaQuery } from '../../hooks/use-media-query';

import styles from './main-page.module.scss';
import { bookApi, useGetAllBooksQuery, useGetBookCategoriesQuery } from '../../store/api/book-api';
import { Loader } from '../../components/loader/loader';
import { Alert } from '../../components/alert/alert';
import { filterBooksByCategory, setBooks, setCategory } from '../../store/slices/books-slice';

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
  const [ratingSort, setRatingSort] = useState('down');

  const [inputValue, setInputValue] = useState('');

  const isMobile = useMediaQuery(screens.mobile);
  const isTablet = useMediaQuery(screens.tablet);
  const { type } = useParams();

  const dispatch = useDispatch();

  const { filteredBooks, categoriesList } = useSelector((state) => state.books);

  const { isFullfiled } = useGetBookCategoriesQuery();
  const { data, error, isLoading, refetch } = useGetAllBooksQuery({ skip: isFullfiled });

  useEffect(() => {
    refetch();

    //  eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setBooks(data));
    }
  }, [isLoading, data, dispatch]);

  useEffect(() => {
    const category = categoriesList?.find((category) => category.path === type);
    dispatch(setCategory(type));
    dispatch(filterBooksByCategory({ type: category?.name, ratingSort, search: inputValue }));
  }, [type, dispatch, categoriesList, ratingSort, inputValue]);

  const toggleShowSearch = () => {
    setIsShowSearch((prev) => !prev);
  };

  const toggleDropdownSort = () => {
    if (ratingSort === 'down') {
      setRatingSort('up');
    } else {
      setRatingSort('down');
    }
  };

  const viewTypeClassName = viewType === 'rows' ? `${styles.booksWrapLists}` : `${styles.booksWrapRows}`;

  const searchBook = (value) => {
    setInputValue(value);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='container'>
      <section className={styles.root}>
        {!isTablet && <Aside />}
        {error && <Alert />}
        {!error && (
          <div className={styles.mainPageWrap}>
            <div className={styles.topMenu}>
              <div className={styles.topMenuFirst}>
                {!isMobile ? (
                  <div className={styles.mainPageInput}>
                    <Input
                      iconName='search'
                      onChange={searchBook}
                      value={inputValue}
                      iconPosition='left'
                      placeholder='Поиск книги или автора…'
                    />
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

                {isMobile && (
                  <div
                    className={classNames(styles.inputMobile, {
                      [styles.active]: isShowSearch,
                      [styles.hidden]: !isShowSearch,
                    })}
                  >
                    <Input
                      iconName='close'
                      iconAction={toggleShowSearch}
                      iconPosition='right'
                      onChange={searchBook}
                      value={inputValue}
                      placeholder='Поиск книги или автора…'
                    />
                  </div>
                )}

                {!isShowSearch && (
                  <Button onClick={toggleDropdownSort} dataTest='sort-rating-button' rounded={isMobile ? true : false}>
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
              {filteredBooks?.length > 0 ? (
                filteredBooks?.map((book) => (
                  <ProductCard
                    key={book.id}
                    id={book.id}
                    searchValue={inputValue}
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
                ))
              ) : inputValue.length > 0 ? (
                <h2 className={styles.errorTitle} data-test-id='search-result-not-found'>
                  По запросу ничего не найдено
                </h2>
              ) : (
                <h2 className={styles.errorTitle} data-test-id='empty-category'>
                  В этой категории книг ещё нет
                </h2>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
