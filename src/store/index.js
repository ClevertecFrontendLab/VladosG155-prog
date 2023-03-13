import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/auth-api';
import { bookApi } from './api/book-api';
import { reducer as productSliceReducer } from './slices/books-slice';
import { reducer as globalSliceReducer } from './slices/global-slice';

export const store = configureStore({
  reducer: {
    books: productSliceReducer,
    global: globalSliceReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApi.middleware).concat(authApi.middleware),
});
