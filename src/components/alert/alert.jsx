import React, { useState } from 'react';

import styles from './alert.module.scss';
import { Icon } from '../icon/icon';

export const Alert = () => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    showAlert && (
      <div className={styles.root} data-test-id='error'>
        <Icon name='warning' />
        <span>Что-то пошло не так. Обновите страницу через некоторое время.</span>
        <button type='button' onClick={() => setShowAlert(false)} className={styles.close}>
          <Icon name='close' />
        </button>
      </div>
    )
  );
};
