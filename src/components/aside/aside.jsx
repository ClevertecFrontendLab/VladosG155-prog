import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './aside.scss';
import { Icon } from '../icon/icon';
import { screens, useMediaQuery } from '../../hooks/use-media-query';
import { useGetBookCategoriesQuery } from '../../store/api/book-api';
import { Loader } from '../loader/loader';

const list = [{ name: 'Все книги', ref: 'path' }];

export const Aside = ({ onClose, isActiveMobileMenu, asideRef = null }) => {
  const [menuList, setMenuList] = useState(list);
  const isTablet = useMediaQuery(screens.tablet);
  const [isActiveMenu, setIsActiveMenu] = useState(true);

  const { pathname } = useLocation();

  const { data, error, isLoading } = useGetBookCategoriesQuery();

  const toggleMenu = () => {
    setIsActiveMenu((prev) => !prev);
  };

  useEffect(() => {
    if (pathname === '/ofert' || pathname === '/rules') {
      setIsActiveMenu(false);
    }
  }, [pathname]);

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
              data?.map((menuItem, i) => (
                <NavLink
                  data-test-id={isTablet ? 'burger-books' : 'navigation-books'}
                  to={`/books/${menuItem.path}`}
                  key={menuItem.id}
                  className={classNames('menuList-item', {
                    hidden: !isActiveMenu,
                  })}
                >
                  <p>
                    {menuItem.name}
                    <span>{menuItem.count}</span>
                  </p>
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
