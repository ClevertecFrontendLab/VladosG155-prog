import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import './aside.scss';
import { Icon } from '../icon/icon';
import { screens, useMediaQuery } from '../../hooks/use-media-query';
import { useGetAllBooksQuery, useGetBookCategoriesQuery } from '../../store/api/book-api';
import { Loader } from '../loader/loader';

import { setCategoriesList, setCategory } from '../../store/slices/books-slice';

const list = [{ name: 'Все книги', path: 'all' }];

export const Aside = ({ onClose, isActiveMobileMenu, asideRef = null }) => {
  const [menuList, setMenuList] = useState(list);
  const isTablet = useMediaQuery(screens.tablet);
  const [isActiveMenu, setIsActiveMenu] = useState(true);

  const [activeCategory, setActiveCategory] = useState('all');

  const { pathname } = useLocation();

  const { data: categories, isLoading, error, isFullfiled: categoriesFullfiled } = useGetBookCategoriesQuery();
  const { data: books } = useGetAllBooksQuery({ skip: categoriesFullfiled });

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsActiveMenu((prev) => !prev);
  };

  useEffect(() => {
    if (pathname === '/ofert' || pathname === '/rules') {
      setIsActiveMenu(false);
    }
  }, [pathname]);

  const categoriesCount = categories?.reduce((accum, current) => {
    const obj = {
      ...current,
      count: 0,
    };
    books?.forEach((book) => {
      if (book.categories.includes(obj.name)) {
        obj.count += 1;
      }
    });

    accum.push(obj);
    return accum;
  }, []);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setCategoriesList(categories));
    }
  }, [isLoading, categories, dispatch]);

  const changeCategory = (category) => {
    setActiveCategory(category);
    dispatch(setCategory(category));
    if (isTablet) {
      onClose();
    }
  };
  return (
    <div
      ref={asideRef}
      className={classNames('aside', {
        active: isTablet && isActiveMobileMenu,
      })}
    >
      <div className='aside-wrapper'>
        <div className='aside-top'>
          <button
            data-test-id={isTablet ? 'burger-showcase' : 'navigation-showcase'}
            type='button'
            className={classNames('', {
              active: isActiveMenu,
            })}
            onClick={toggleMenu}
          >
            Витрина книг
            <Icon name='angleDown' />
          </button>

          <div
            className={classNames('aside-wrap', {
              active: isActiveMenu,
            })}
          >
            {!error &&
              categoriesCount &&
              [...list, ...categoriesCount]?.map((menuItem, i) => (
                <NavLink
                  to={`/books/${menuItem.path}`}
                  key={menuItem.id}
                  onClick={() => changeCategory(menuItem.path)}
                  className={classNames('menuList-item', {
                    hidden: !isActiveMenu,
                  })}
                >
                  <p
                    data-test-id={
                      i === 0
                        ? isTablet
                          ? 'burger-books'
                          : 'navigation-books'
                        : isTablet
                        ? `burger-${menuItem.path}`
                        : `navigation-${menuItem.path}`
                    }
                  >
                    {menuItem.name}
                  </p>
                  <span
                    data-test-id={
                      isTablet ? `burger-book-count-for-${menuItem.path}` : `navigation-book-count-for-${menuItem.path}`
                    }
                  >
                    {menuItem.count}
                  </span>
                </NavLink>
              ))}
          </div>
        </div>

        <div className='aside-footer'>
          <NavLink onClick={onClose} to='/rules' data-test-id={isTablet ? 'burger-terms' : 'navigation-terms'}>
            Правила пользования
          </NavLink>
          <NavLink onClick={onClose} to='/ofert' data-test-id={isTablet ? 'burger-contract' : 'navigation-contract'}>
            Договор оферты
          </NavLink>
        </div>
        {isTablet && (
          <div className='aside-profile'>
            <p>Профиль</p>
            <p>Выход</p>
          </div>
        )}
      </div>
    </div>
  );
};
