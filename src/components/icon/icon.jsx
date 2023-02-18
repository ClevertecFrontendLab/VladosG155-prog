import React from 'react';

import { icons } from '../../icons';

import './icon.scss';

export const Icon = ({ name, size = 'default' }) => (
  <i className='icon' data-size={size} dangerouslySetInnerHTML={{ __html: icons[name] }} />
);
