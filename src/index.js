import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import moment from 'moment';
import ru from 'moment/locale/ru';
import { Loader } from './components/loader/loader';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { BookPage } from './pages/book';
import { InfoPage } from './pages/info/info-page';
import { MainPage } from './pages/main';

import { useGetAllBooksQuery } from './store/api/book-api';
import { store } from './store';

import './index.scss';

moment.locale('ru');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <HashRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/books/all' />} />
        <Route path='/books/:type' element={<MainPage />} />
        <Route path='/books/:type/:id' element={<BookPage />} />
        <Route path='/rules' element={<InfoPage title='Правила пользования' />} />
        <Route path='/ofert' element={<InfoPage title='Договор оферты' />} />
      </Routes>
      <Footer />
    </HashRouter>
  </Provider>
);
