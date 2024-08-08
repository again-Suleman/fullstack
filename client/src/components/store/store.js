import { configureStore } from '@reduxjs/toolkit';
import storesReducer from './slices/storeSlice/storeSlice';
import authSlice from './slices/authSlice/authSlice';


export const store = configureStore({
  reducer: {
    auth: authSlice,
    stores: storesReducer
  },
});

export default store;
