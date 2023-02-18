import { Icon } from '../icon/icon';

import './input.scss';

export const Input = ({ value, onChange, iconName, iconPosition, placeholder, iconAction, ...props }) => (
  <div className='input-wrap' data-position={iconPosition}>
    {iconName ? (
      <button type='button' data-test-id='button-search-close' onClick={iconAction} className='icon-wrap'>
        <Icon name={iconName} />
      </button>
    ) : null}

    <input className='input' value={value} onChange={onChange} placeholder={placeholder} {...props} />
  </div>
);
