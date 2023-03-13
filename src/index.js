import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import moment from 'moment';
import ru from 'moment/locale/ru';

import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Layout } from './components/layout/layout';
import { Loader } from './components/loader/loader';
import { AuthPage } from './pages/auth/auth-page';
import { BookPage } from './pages/book';
import { ForgotPass } from './pages/forgot-pass/forgot-pass';
import { InfoPage } from './pages/info/info-page';
import { MainPage } from './pages/main';
import { RegisterPage } from './pages/register/register-page';
import { useGetAllBooksQuery } from './store/api/book-api';
import { store } from './store';

import './index.scss';

moment.locale('ru');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/books/all' />} />
        <Route path='/registration' element={<RegisterPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/forgot-pass' element={<ForgotPass />} />
        <Route
          path='/books/:type'
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />
        <Route
          path='/books/'
          element={
            <Layout>
              <MainPage />
            </Layout>
          }
        />
        <Route
          path='/books/:type/:id'
          element={
            <Layout>
              <BookPage />
            </Layout>
          }
        />
        <Route
          path='/rules'
          element={
            <Layout>
              <InfoPage title='Правила пользования' />
            </Layout>
          }
        />
        <Route
          path='/ofert'
          element={
            <Layout>
              <InfoPage title='Договор оферты' />
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  </Provider>
);
