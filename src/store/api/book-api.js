import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApiUrl } from '../../settings/api';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseApiUrl}/api` }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => '/books',
    }),
    getBookById: builder.query({
      query: (id) => ({ url: `/books/${id}` }),
    }),
    getBookCategories: builder.query({
      query: () => '/categories',
    }),
  }),
});

export const { useGetAllBooksQuery, useGetBookByIdQuery, useGetBookCategoriesQuery } = bookApi;
