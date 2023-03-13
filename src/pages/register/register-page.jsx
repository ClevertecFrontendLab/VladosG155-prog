import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Button } from '../../components/button/button';
import { TextField } from '../../components/text-field/text-field';

import styles from './register-page.module.scss';
import { useRegisterMutation } from '../../store/api/auth-api';
import { Loader } from '../../components/loader/loader';
import { Icon } from '../../components/icon/icon';
import { Modal } from '../../components/modal/modal';

const schema = yup.object({
  username: yup
    .string()
    .matches(/^[A-Za-z0-9]+$/g, 'латинский алфавит')
    .matches(/[0-9]/g, 'цифры')
    .required(),
  password: yup
    .string()

    .min(8, 'не менее 8 символов')
    .matches(/^(?=.*[A-Z])/, 'заглавной буквой')
    .matches(/[0-9]/g, 'цифрой')
    .required(),
  firstName: yup.string().min(3).required('Поле не может быть пустым'),
  lastName: yup.string().min(3).required('Поле не может быть пустым'),
  phone: yup
    .string()
    .matches(/^\+375(\s+)?\(?(25|29|33|44)\)?(\s+)?[0-9]{3}-[0-9]{2}-[0-9]{2}$/, 'В формате +375 (xx) xxx-xx-xx'),
  email: yup.string().matches(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Введите корректный e-mail'),
});

export const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    criteriaMode: 'all',
    mode: 'all',
  });

  const [registerUser, response] = useRegisterMutation();

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [respStatus, setRespStatus] = useState(0);

  if (localStorage.getItem('jwt')) {
    return <Navigate to='/books/all' />;
  }

  const onSubmit = async (data) => {
    const res = await registerUser(data);
    console.log('response', response);
    console.log('res', res);
    if (!res.error) {
      setRespStatus(201);
    } else {
      setRespStatus(res.error.status);
    }
  };

  const backToRegistration = () => {
    setStep(1);
    setRespStatus(0);
    reset();
  };

  return (
    <div className={styles.root}>
      <h3>Cleverland</h3>
      {response.isLoading && <Loader />}
      {respStatus === 400 && (
        <Modal>
          <div data-test-id='status-block' className={styles.modalWrap}>
            <h4>Данные не сохранились</h4>
            <p>
              Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.
            </p>
            <Button btnType='main' fullwidth={true} onClick={backToRegistration} height='52px'>
              назад к регистрации
            </Button>
          </div>
        </Modal>
      )}
      {respStatus !== 400 && respStatus !== 0 && respStatus !== 201 && (
        <Modal>
          <div data-test-id='status-block' className={styles.modalWrap}>
            <h4>Данные не сохранились</h4>
            <p>Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз</p>
            <Button btnType='main' fullwidth={true} onClick={handleSubmit(onSubmit)} height='52px'>
              повторить
            </Button>
          </div>
        </Modal>
      )}
      {respStatus === 201 && (
        <Modal>
          <div data-test-id='status-block' className={styles.modalWrap}>
            <h4>Регистрация успешна</h4>
            <p>Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль</p>
            <Button btnType='main' fullwidth={true} onClick={() => navigate('/auth')} height='52px'>
              вход
            </Button>
          </div>
        </Modal>
      )}

      {respStatus === 0 && (
        <Modal dataTest='auth'>
          <h4>Регистрация</h4>
          <p>шаг {step} из 3</p>

          <form data-test-id='register-form'>
            {step === 1 && (
              <>
                <Controller
                  name='username'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder='Придумайте логин для входа'
                      name='username'
                      ref={null}
                      control={control}
                      description='Используйте для логина латинский алфавит и цифры'
                    />
                  )}
                />
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      ref={null}
                      placeholder='Пароль'
                      name='password'
                      type='password'
                      control={control}
                      description='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    />
                  )}
                />
                <Button
                  btnType='main'
                  onClick={async () => {
                    const resp = await trigger(['username', 'password']);
                    if (resp) {
                      setStep((prev) => prev + 1);
                    }
                  }}
                  fullwidth={true}
                  height='52px'
                >
                  следующий шаг
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <Controller
                  name='firstName'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder='Имя'
                      description={errors.firstName && 'Поле не может быть пустым'}
                      name='firstName'
                      ref={null}
                      control={control}
                    />
                  )}
                />
                <Controller
                  name='lastName'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      ref={null}
                      placeholder='Фамилия'
                      description={errors.lastName && 'Поле не может быть пустым'}
                      name='lastName'
                      control={control}
                    />
                  )}
                />
                <Button
                  onClick={async () => {
                    const resp = await trigger(['firstName', 'lastName']);
                    if (resp) {
                      setStep((prev) => prev + 1);
                    }
                  }}
                  btnType='main'
                  disabled={errors.firstName || errors.lastName}
                  fullwidth={true}
                  height='52px'
                >
                  последний шаг
                </Button>
              </>
            )}
            {step === 3 && (
              <>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      ref={null}
                      placeholder='Номер телефона'
                      description='В формате +375 (xx) xxx-xx-xx'
                      name='phone'
                      control={control}
                    />
                  )}
                />
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      ref={null}
                      placeholder='E-mail'
                      description={errors.email && 'Введите корректный e-mail'}
                      name='email'
                      control={control}
                    />
                  )}
                />
                <Button
                  btnType='main'
                  disabled={errors.phone || errors.email}
                  onClick={async () => {
                    const resp = await trigger(['tel', 'email']);
                    if (resp) {
                      handleSubmit(onSubmit)();
                    }
                  }}
                  fullwidth={true}
                  height='52px'
                >
                  зарегистрироваться
                </Button>
              </>
            )}
          </form>

          <div className={styles.ref}>
            Есть учётная запись?
            <Link to='/auth'>
              войти <Icon name='arrowRight' />
            </Link>
          </div>
        </Modal>
      )}
    </div>
  );
};
