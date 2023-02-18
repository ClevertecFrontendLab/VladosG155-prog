import './button.scss';

export const Button = ({
  onClick,
  children,
  btnType = 'default',
  rounded = 'false',
  fullwidth,
  disabled,
  className = '',
  dataTest,
}) => (
  <button
    style={fullwidth ? { width: '100%' } : null}
    type='button'
    className={`button ${className}`}
    data-type={btnType}
    disabled={disabled}
    data-rounded={rounded}
    onClick={onClick}
    data-test-id={dataTest}
  >
    {children}
  </button>
);
