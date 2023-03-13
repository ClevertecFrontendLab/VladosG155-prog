import React from 'react';

import styles from './modal.module.scss';

export const Modal = ({ children, dataTest = 'auth' }) => (
  <div data-test-id='auth' className={styles.root}>
    {children}
  </div>
);
