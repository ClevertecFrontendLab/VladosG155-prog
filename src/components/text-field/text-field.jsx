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

    const errorList = errors[name] ? Object.values(errors[name].types).flat(1) : null;

    if (errorList && isFocused) {
      errorList.forEach((match) => {
        const regexp = new RegExp(match, 'ig');
        newStr = newStr.replace(regexp, `<span className=${styles.hinted}>$&</span>`);
      });
    } else if (errorList && !isFocused) {
      newStr = `<span>${description}</span>`;
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

            {!errors[name] ||
              (field.value?.length < 0 && (
                <div className={styles.done}>
                  <Icon name='done' />
                </div>
              ))}
          </>
        )}
      </div>
      {field.value.length <= 0 && !isFocused && errors[name] ? (
        parse(`<span className=${styles.hint} data-test-id="hint">Поле не может быть пустым</span>`)
      ) : (
        <h2 data-test-id='hint'>{parse(newDescription)}</h2>
      )}
    </div>
  );
};
