import { configureStore } from '@reduxjs/toolkit';

import { bookApi } from './api/book-api';
import { reducer as globalSliceReducer } from './slices/global-slice';
import { reducer as productSliceReducer } from './slices/product-slice';

export const store = configureStore({
  reducer: {
    product: productSliceReducer,
    global: globalSliceReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApi.middleware),
});
