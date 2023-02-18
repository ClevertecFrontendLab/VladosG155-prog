import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Aside } from '../aside/aside';
import avatar from '../../assets/avatar.png';

import { screens, useMediaQuery } from '../../hooks/use-media-query';
import { Icon } from '../icon/icon';

import './header.scss';
import { useClickOutside } from '../../hooks/use-click-outside';

export const Header = () => {
  const isTablet = useMediaQuery(screens.tablet);

  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  const [isActiveMenu, setIsActiveMenu] = useState(false);

  useClickOutside(menuRef, () => setIsActiveMenu(false), burgerRef);

  const toggleMenu = () => {
    setIsActiveMenu((prev) => !prev);
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='header-first'>
          <Link
            to='/books/all'
            className={classNames('', {
              hidden: isTablet,
            })}
          >
            <Icon name='logo' />
          </Link>
          <button
            type='button'
            ref={burgerRef}
            data-test-id='button-burger'
            onClick={toggleMenu}
            data-ignore-outside={true}
            className={classNames('burger-button', {
              active: isActiveMenu,
              hidden: !isTablet,
            })}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        {isTablet && <Aside asideRef={menuRef} isActiveMobileMenu={isActiveMenu} onClose={toggleMenu} />}
        <h3>Библиотека</h3>
        {!isTablet && (
          <div className='user-menu'>
            <span>Привет, Иван!</span>
            <img src={avatar} alt='' />
          </div>
        )}
      </div>
    </div>
  );
};
