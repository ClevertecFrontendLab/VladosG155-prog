import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import classNames from 'classnames';

import parse from 'html-react-parser';
import MaskedInput from 'react-text-mask';
import { Icon } from '../icon/icon';

import styles from './text-field.module.scss';

export const TextField = ({ placeholder, name, description = '', control, type }) => {
  const {
    field,
    fieldState: { isTouched },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required: true },
  });
  const [isFocused, setIsFocused] = useState(false);
  const [newDescription, setNewDescription] = useState(description);
  const [inputType, setInputType] = useState(type);
  useEffect(() => {
    const text = `${description}`;

    let newStr = text;
    if (!errors[name]) {
      setNewDescription(text);
    }

    console.log(errors);

    const errorList = errors[name] ? Object.values(errors[name].types).flat(1) : null;

    const descriptionHasSpan = description.match('<span[^>]*>');

    console.log(descriptionHasSpan);
    console.log(description);
    if (errorList && isFocused) {
      errorList.forEach((match) => {
        const regexp = new RegExp(match, 'ig');
        if (descriptionHasSpan) {
          // eslint-disable-next-line
          const reg = new RegExp(`<span[^>]*>${match}+<\/span>`, 'ig');
          console.log('reg', reg);
          // eslint-disable-next-line
          console.log('matched', newStr.match(reg));
          newStr = newStr.replace(reg, `<span className=${styles.hint}>${match}</span>`);
        } else {
          newStr = newStr.replace(regexp, `<span  className=${styles.hint}>$&</span>`);
        }
      });
    } else if (errorList && !isFocused) {
      newStr = `<span className=${styles.hint}>${description}</span>`;
    }

    setNewDescription(newStr);
  }, [description, field, errors, name, isFocused]);
  const changeInputType = () => {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  };

  const onBlur = () => {
    field.onBlur();
    setIsFocused(false);
  };

  const telMask = [
    '+',
    '3',
    '7',
    '5',
    ' ',
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ];

  return (
    <div className={styles.input}>
      <div className={styles.inputWrap}>
        <label
          htmlFor={name}
          className={classNames('', {
            [styles.active]: isFocused || field?.value?.length > 0,
          })}
        >
          {placeholder}
        </label>
        {name === 'phone' ? (
          <MaskedInput
            mask={telMask}
            id={name}
            onChange={field.onChange}
            onBlur={onBlur}
            placeholderChar='x'
            value={field.value}
            placeholder={!isFocused ? placeholder : ''}
            type={inputType}
            style={(!isFocused && errors[name]) || errors.root ? { borderColor: 'red' } : null}
            autoComplete='on'
            name={field.name}
            ref={field.ref}
            onFocus={() => setIsFocused(true)}
          />
        ) : (
          <input
            id={name}
            onChange={field.onChange}
            onBlur={onBlur}
            value={field.value}
            type={inputType}
            placeholder={!isFocused ? placeholder : ''}
            style={(!isFocused && errors[name]) || errors.root ? { borderColor: 'red' } : null}
            autoComplete='on'
            name={field.name}
            ref={field.ref}
            onFocus={() => setIsFocused(true)}
          />
        )}

        {type === 'password' && (
          <>
            {field.value?.length > 0 && (
              <button
                className={styles.eye}
                data-test-id={inputType === 'password' ? 'eye-closed' : 'eye-opened'}
                onClick={changeInputType}
                type='button'
              >
                {inputType === 'password' ? <Icon name='eye' /> : <Icon name='eyeClosed' />}
              </button>
            )}

            {name !== 'passwordConfirmation' && !errors[name] && field.value.length > 0 && (
              <div data-test-id='checkmark' className={styles.done}>
                <Icon name='done' />
              </div>
            )}
          </>
        )}
      </div>
      {field.value.length <= 0 && !isFocused && errors[name]
        ? parse(`<span className=${styles.hint} data-test-id="hint">Поле не может быть пустым</span>`)
        : description && (
            <h2 data-test-id='hint' style={!isFocused && errors[name] ? { color: 'rgb(244, 44, 79)' } : null}>
              {parse(newDescription)}
            </h2>
          )}
    </div>
  );
};
