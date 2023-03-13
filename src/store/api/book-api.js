import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseApiUrl } from '../../settings/api';
import { axiosBaseQuery } from '../../settings/axios';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: axiosBaseQuery({
    baseUrl: `${baseApiUrl}/api`,
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => ({
        url: '/books',
        method: 'GET',
      }),
    }),
    getBookById: builder.query({
      query: (id) => ({ url: `/books/${id}`, method: 'GET' }),
    }),
    getBookCategories: builder.query({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllBooksQuery, useGetBookByIdQuery, useGetBookCategoriesQuery } = bookApi;
